import Career from '../models/Career.js';
import Lead from '../models/Lead.js';
import { sendLeadReceivedEmail } from '../config/emailService.js';

export async function getCareers(req, res) {
  try {
    const careers = await Career.find().sort({ postedAt: -1 });
    return res.json(careers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch careers.' });
  }
}

export async function submitApplication(req, res) {
  const { name, email, position, message } = req.body;
  if (!name || !email || !position || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const lead = await Lead.create({
      name,
      email,
      phone: '',
      service: `Career: ${position}`,
      subject: `Application for ${position}`,
      message,
      source: 'career_application',
      status: 'new'
    });

    await sendLeadReceivedEmail(lead);
    return res.status(200).json({ message: 'Application submitted successfully.', leadId: lead._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while submitting application.' });
  }
}
