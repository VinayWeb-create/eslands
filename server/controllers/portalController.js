import User from '../models/User.js';
import Lead from '../models/Lead.js';
import Quote from '../models/Quote.js';
import Invoice from '../models/Invoice.js';
import Certificate from '../models/Certificate.js';
import jwt from 'jsonwebtoken';

export async function portalLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid portal login credentials.' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid portal login credentials.' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'crmsupersecretkey123',
      { expiresIn: '7d' }
    );
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Portal login error.' });
  }
}

export async function getPortalDashboard(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Portal user not found.' });

    if (user.role === 'student') {
      const lead = await Lead.findById(user.leadRef);
      const quote = await Quote.findOne({ lead: user.leadRef }).sort({ createdAt: -1 });
      const certificates = await Certificate.find({ student: user._id });
      
      // Mock curriculum, schedule and assignments for student portal view
      const studyMaterial = [
        { title: 'Enterprise Architectural Patterns', type: 'PDF', url: '#' },
        { title: 'Zero-Trust Cybersecurity Handout', type: 'PDF', url: '#' },
        { title: 'React Performance Audits Guide', type: 'PDF', url: '#' }
      ];

      const recordedVideos = [
        { title: 'Docker Containers & Kubernetes Pods setup', duration: '45 mins', url: '#' },
        { title: 'CI/CD pipeline configuration with Vercel/GitHub Actions', duration: '60 mins', url: '#' }
      ];

      const assignments = [
        { title: 'Build a secure microservices API gateway', status: 'Completed', grade: 'A+' },
        { title: 'Implement custom Framer Motion page transition variants', status: 'Pending', grade: '—' }
      ];

      return res.json({
        user: {
          id: user._id,
          leadId: user.leadRef,
          name: user.name,
          email: user.email,
          role: user.role,
          course: user.courseOrProjectName || 'Fullstack Web Engineering',
          batch: user.batchName || 'Batch A26 (2026)',
          trainer: 'Senior Architect Dev',
          classLink: user.classLink || 'https://meet.google.com/xyz-qprs-tuv',
          status: lead ? lead.status : 'enrolled',
          outstandingAmount: (lead && lead.status === 'payment_pending' && quote) ? quote.total : 0
        },
        studyMaterial,
        recordedVideos,
        assignments,
        certificates
      });
    } else {
      // client role dashboard
      const lead = await Lead.findById(user.leadRef);
      const quotes = await Quote.find({ lead: user.leadRef }).select('quoteNumber total status createdAt validUntil');
      const invoices = await Invoice.find({ lead: user.leadRef }).select('invoiceNumber total subtotal taxAmount issuedAt');

      return res.json({
        user: {
          id: user._id,
          leadId: user.leadRef,
          name: user.name,
          email: user.email,
          role: user.role,
          project: user.courseOrProjectName || 'Enterprise System Implementation',
          status: lead ? lead.status : 'project_started'
        },
        quotes,
        invoices,
        supportContact: {
          name: 'Esland IT Support Center',
          email: 'support@eslanditsolutions.com',
          phone: '+44 20 7946 0958'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to load portal telemetry.' });
  }
}
