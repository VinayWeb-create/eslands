import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'esland-crm-secret-key-2024';

export async function protect(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token.' });
  }
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: 'Not authorized, user not found.' });
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid.' });
  }
}

export function adminOnly(req, res, next) {
  if (req.admin && req.admin.role === 'admin') return next();
  return res.status(403).json({ message: 'Admin access required.' });
}

export function generateToken(id) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
}
