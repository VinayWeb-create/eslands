import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  amount: { type: Number, required: true, min: 0 },
  transactionId: { type: String, default: '' },
  method: { type: String, default: 'Credit Card' },
  status: { type: String, enum: ['pending', 'partially_paid', 'paid'], default: 'pending' },
  date: { type: Date, default: Date.now },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PaymentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
