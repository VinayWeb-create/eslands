import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  company: { type: String, default: '' },
  country: { type: String, default: '' },
  service: { type: String, default: 'General Inquiry' },
  subject: { type: String, default: '' },
  message: { type: String, default: '' },
  source: { type: String, enum: ['contact_form', 'manual', 'website', 'referral', 'career_application', 'demo_booking', 'course_enrollment', 'newsletter_form'], default: 'contact_form' },
  status: { type: String, enum: [
    'new', 'contacted', 'demo_scheduled', 'demo_completed', 'quote_sent', 'payment_pending', 
    'project_started', 'project_completed', 'enrolled', 'fees_paid', 'batch_assigned', 
    'in_progress', 'completed', 'certificate_issued', 'lost', 'qualified', 'proposal_sent', 'converted'
  ], default: 'new' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  notes: [noteSchema],
  tags: [{ type: String }],
  lostReason: { type: String, default: '' },
  contactRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

LeadSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

LeadSchema.index({ status: 1 });
LeadSchema.index({ priority: 1 });
LeadSchema.index({ email: 1 });
LeadSchema.index({ createdAt: -1 });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
