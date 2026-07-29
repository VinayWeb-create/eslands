import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
  service: { type: String, required: true },
  description: { type: String, default: '' },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true }
}, { _id: false });

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote' },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  items: [invoiceItemSchema],
  subtotal: { type: Number, required: true },
  taxRate: { type: Number, default: 20 },
  taxAmount: { type: Number, required: true },
  total: { type: Number, required: true },
  issuedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
