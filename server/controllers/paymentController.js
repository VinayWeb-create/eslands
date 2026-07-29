import Payment from '../models/Payment.js';
import Lead from '../models/Lead.js';
import Invoice from '../models/Invoice.js';
import Quote from '../models/Quote.js';
import User from '../models/User.js';
import { generateInvoicePDF } from '../config/pdfService.js';
import { 
  sendPaymentConfirmationEmail, 
  sendInvoiceEmail, 
  sendEnrollmentConfirmationEmail 
} from '../config/emailService.js';

async function generateInvoiceNumber() {
  const count = await Invoice.countDocuments();
  return `INV-${String(count + 1).padStart(4, '0')}`;
}

export async function getPayments(req, res) {
  try {
    const payments = await Payment.find().populate('lead', 'name email service status');
    return res.json(payments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch payments.' });
  }
}

export async function processSuccessfulPayment(payment, lead, portalRole, adminId = null) {
  // 1. Generate Invoice from last accepted Quote or create invoice from scratch
  const quote = await Quote.findOne({ lead: lead._id }).sort({ createdAt: -1 });
  const invoiceNumber = await generateInvoiceNumber();

  let invoiceItems = [];
  let subtotal = payment.amount;
  let taxRate = 20;
  let taxAmount = Math.round((subtotal * taxRate) / 100 * 100) / 100;
  let total = Math.round((subtotal + taxAmount) * 100) / 100;

  if (quote) {
    invoiceItems = quote.items;
    subtotal = quote.subtotal;
    taxRate = quote.taxRate;
    taxAmount = quote.taxAmount;
    total = quote.total;
  } else {
    invoiceItems = [{
      service: lead.service || 'General Service',
      description: lead.subject || 'Standard Business Services',
      quantity: 1,
      unitPrice: payment.amount,
      total: payment.amount
    }];
  }

  const invoice = await Invoice.create({
    invoiceNumber,
    lead: lead._id,
    quote: quote ? quote._id : undefined,
    payment: payment._id,
    items: invoiceItems,
    subtotal,
    taxRate,
    taxAmount,
    total
  });

  lead.notes.push({
    text: `Invoice ${invoiceNumber} automatically generated for £${total.toLocaleString()}`,
    createdBy: adminId
  });

  // 2. Auto advance Lead status based on workflow role
  const resolvedRole = portalRole || 
    ((lead.service && (
      lead.service.toLowerCase().includes('course') || 
      lead.service.toLowerCase().includes('training') ||
      lead.service.toLowerCase().includes('academy')
    )) ? 'student' : 'client');

  if (resolvedRole === 'student') {
    lead.status = 'fees_paid';
  } else {
    lead.status = 'project_started';
  }

  await lead.save();

  // 3. Auto create Client/Student Portal Credentials
  let user = await User.findOne({ email: lead.email });
  let plainPassword = '';
  if (!user) {
    plainPassword = `Esland-${Math.floor(1000 + Math.random() * 9000)}`;
    user = await User.create({
      name: lead.name,
      email: lead.email,
      password: plainPassword,
      role: resolvedRole,
      leadRef: lead._id,
      courseOrProjectName: lead.service
    });

    lead.notes.push({
      text: `Auto-generated ${resolvedRole} Portal account with username ${lead.email}`,
      createdBy: adminId
    });
  }

  // 4. Generate Invoice PDF and send Email with attachments
  try {
    const invoicePdfBuffer = await generateInvoicePDF(invoice, lead);
    
    // Send email notifications
    await sendPaymentConfirmationEmail(lead, payment);
    await sendInvoiceEmail(lead, invoice, invoicePdfBuffer);
    
    if (plainPassword) {
      await sendEnrollmentConfirmationEmail(lead, user, plainPassword);
    }
  } catch (err) {
    console.error('Failed to generate PDF or send email:', err);
  }
}

export async function createPayment(req, res) {
  const { leadId, amount, transactionId, method, status, notes, portalRole } = req.body;
  if (!leadId || !amount) {
    return res.status(400).json({ message: 'Lead ID and Amount are required.' });
  }
  try {
    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });

    const payment = await Payment.create({
      lead: leadId,
      amount,
      transactionId: transactionId || `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      method: method || 'Credit Card',
      status: status || 'paid',
      notes: notes || ''
    });

    lead.notes.push({
      text: `Payment of £${amount.toLocaleString()} logged via ${payment.method}. Status: ${payment.status}. Trans ID: ${payment.transactionId}`,
      createdBy: req.admin._id
    });

    if (payment.status === 'paid') {
      await processSuccessfulPayment(payment, lead, portalRole, req.admin._id);
    } else {
      await lead.save();
    }

    return res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to register payment.' });
  }
}
