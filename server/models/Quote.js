import mongoose from 'mongoose';

const quoteItemSchema = new mongoose.Schema({
  service: { type: String, required: true },
  description: { type: String, default: '' },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true },
}, { _id: false });

const QuoteSchema = new mongoose.Schema({
  quoteNumber: { type: String, required: true, unique: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  items: { type: [quoteItemSchema], required: true, validate: v => v.length > 0 },
  subtotal: { type: Number, required: true },
  taxRate: { type: Number, default: 20 },
  taxAmount: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['draft', 'sent', 'accepted', 'rejected', 'expired'], default: 'draft' },
  validUntil: { type: Date },
  notes: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  sentAt: { type: Date },
  acceptedAt: { type: Date },
  rejectedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

QuoteSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

QuoteSchema.index({ status: 1 });
QuoteSchema.index({ lead: 1 });
QuoteSchema.index({ quoteNumber: 1 });

export default mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);
