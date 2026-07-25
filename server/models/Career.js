import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], default: [] },
  postedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Career || mongoose.model('Career', CareerSchema);
