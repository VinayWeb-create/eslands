import Invoice from '../models/Invoice.js';
import Lead from '../models/Lead.js';
import { generateInvoicePDF } from '../config/pdfService.js';

export async function getInvoices(req, res) {
  try {
    const invoices = await Invoice.find().populate('lead', 'name email service');
    return res.json(invoices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch invoices.' });
  }
}

export async function downloadInvoicePDF(req, res) {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found.' });

    const lead = await Lead.findById(invoice.lead);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });

    const pdfBuffer = await generateInvoicePDF(invoice, lead);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice_${invoice.invoiceNumber}.pdf`);
    return res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to generate PDF.' });
  }
}
