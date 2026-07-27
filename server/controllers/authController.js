import Admin from '../models/Admin.js';
import { generateToken } from '../middleware/auth.js';

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    admin.lastLogin = new Date();
    await admin.save();
    const token = generateToken(admin._id);
    return res.json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error during login.' });
  }
}

export async function getMe(req, res) {
  return res.json({
    admin: { id: req.admin._id, name: req.admin.name, email: req.admin.email, role: req.admin.role },
  });
}

export async function registerAdmin(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }
  try {
    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'Admin with this email already exists.' });
    }
    const admin = await Admin.create({ name, email: email.toLowerCase(), password, role: role || 'agent' });
    const token = generateToken(admin._id);
    return res.status(201).json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error during registration.' });
  }
}
