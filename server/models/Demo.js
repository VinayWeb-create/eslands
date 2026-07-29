import mongoose from 'mongoose';

const DemoSchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  demoDate: { type: String, required: true }, // Format: YYYY-MM-DD
  demoTime: { type: String, required: true }, // Format: HH:MM
  meetingLink: { type: String, default: '' },
  trainer: { type: String, default: '' },
  salesPerson: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled', 'no_show'], default: 'scheduled' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

DemoSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Demo || mongoose.model('Demo', DemoSchema);
