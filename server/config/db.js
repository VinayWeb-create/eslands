import mongoose from 'mongoose';

export default async function connectDB(uri) {
  try {
    await mongoose.connect(uri, { family: 4 });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
