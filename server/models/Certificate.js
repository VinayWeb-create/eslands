import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  certificateNumber: { type: String, required: true, unique: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: String, required: true },
  status: { type: String, enum: ['pending', 'issued', 'downloaded'], default: 'pending' },
  issuedDate: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CertificateSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
