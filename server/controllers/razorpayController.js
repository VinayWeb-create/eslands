import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment.js';
import Lead from '../models/Lead.js';
import Quote from '../models/Quote.js';
import { processSuccessfulPayment } from './paymentController.js';

function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';
  return new Razorpay({ key_id, key_secret });
}

export async function createRazorpayOrder(req, res) {
  const { leadId, amount } = req.body;
  if (!leadId || !amount) {
    return res.status(400).json({ message: 'Lead ID and Amount are required.' });
  }

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });

    const rzp = getRazorpayInstance();
    const options = {
      amount: Math.round(amount * 100), // amount in paisa/cents
      currency: 'GBP',
      receipt: `receipt_${leadId.substring(0, 10)}_${Date.now()}`
    };

    const order = await rzp.orders.create(options);
    return res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
      lead
    });
  } catch (error) {
    console.error('Razorpay Order Creation Failed:', error);
    return res.status(500).json({ message: 'Unable to initialize online checkout.' });
  }
}

export async function verifyRazorpayPayment(req, res) {
  const { 
    razorpay_order_id, 
    razorpay_payment_id, 
    razorpay_signature, 
    leadId, 
    amount, 
    portalRole 
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !leadId) {
    return res.status(400).json({ message: 'All transaction verification parameters are required.' });
  }

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });

    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';
    
    // Generate signature check
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(body.toString())
      .digest("hex");

    // If key_secret is dummy_secret, we bypass the signature validation to make local sandbox testing trivial
    if (expectedSignature !== razorpay_signature && key_secret !== 'dummy_secret') {
      return res.status(400).json({ message: 'Signature verification failed. Invalid transaction.' });
    }

    // Log the online payment receipt
    const payment = await Payment.create({
      lead: leadId,
      amount: Number(amount),
      transactionId: razorpay_payment_id,
      method: 'Razorpay Online',
      status: 'paid',
      notes: `Online checkout completed. Order ID: ${razorpay_order_id}`
    });

    lead.notes.push({
      text: `Payment of £${amount.toLocaleString()} logged via ${payment.method}. Status: ${payment.status}. Trans ID: ${payment.transactionId}`
    });

    // Run invoice/portal automation
    await processSuccessfulPayment(payment, lead, portalRole, null);

    return res.status(201).json({ message: 'Payment successfully processed!', payment });
  } catch (error) {
    console.error('Razorpay Payment Verification Failed:', error);
    return res.status(500).json({ message: 'Error completing online transaction.' });
  }
}

export async function getPublicCheckoutDetails(req, res) {
  try {
    const lead = await Lead.findById(req.params.leadId);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });

    const quote = await Quote.findOne({ lead: lead._id }).sort({ createdAt: -1 });
    if (!quote) return res.status(404).json({ message: 'No quote found for this lead.' });

    return res.json({
      lead: {
        id: lead._id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone || '',
        service: lead.service,
        status: lead.status
      },
      quote: {
        id: quote._id,
        quoteNumber: quote.quoteNumber,
        subtotal: quote.subtotal,
        taxAmount: quote.taxAmount,
        total: quote.total,
        status: quote.status
      }
    });
  } catch (error) {
    console.error('Failed to get public checkout details:', error);
    return res.status(500).json({ message: 'Error retrieving payment info.' });
  }
}
