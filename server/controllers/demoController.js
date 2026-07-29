import Demo from '../models/Demo.js';
import Lead from '../models/Lead.js';
import { sendDemoConfirmationEmail } from '../config/emailService.js';

export async function getDemos(req, res) {
  try {
    const demos = await Demo.find().populate('lead', 'name email service status');
    return res.json(demos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch demos.' });
  }
}

export async function createDemo(req, res) {
  const { leadId, demoDate, demoTime, meetingLink, trainer, salesPerson, notes } = req.body;
  if (!leadId || !demoDate || !demoTime) {
    return res.status(400).json({ message: 'Lead ID, Date and Time are required.' });
  }
  try {
    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });

    const demo = await Demo.create({
      lead: leadId,
      demoDate,
      demoTime,
      meetingLink: meetingLink || 'https://meet.google.com/abc-defg-hij',
      trainer: trainer || '',
      salesPerson: salesPerson || '',
      notes: notes || ''
    });

    // Update Lead status and audit trail
    lead.status = 'demo_scheduled';
    lead.notes.push({
      text: `Demo scheduled on ${demoDate} at ${demoTime}. Meeting link: ${demo.meetingLink}`,
      createdBy: req.admin._id
    });
    await lead.save();

    // Send confirmation email
    await sendDemoConfirmationEmail(lead, demo);

    return res.status(201).json(demo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to schedule demo.' });
  }
}

export async function updateDemoStatus(req, res) {
  const { status, notes } = req.body;
  const validStatuses = ['scheduled', 'completed', 'cancelled', 'no_show'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status.' });
  }
  try {
    const demo = await Demo.findById(req.params.id);
    if (!demo) return res.status(404).json({ message: 'Demo not found.' });

    demo.status = status;
    if (notes) demo.notes = notes;
    await demo.save();

    const lead = await Lead.findById(demo.lead);
    if (lead) {
      if (status === 'completed') {
        lead.status = 'demo_completed';
        lead.notes.push({
          text: `Demo session completed successfully.`,
          createdBy: req.admin._id
        });
        await lead.save();
      } else if (status === 'cancelled') {
        lead.notes.push({
          text: `Demo session was cancelled.`,
          createdBy: req.admin._id
        });
        await lead.save();
      }
    }

    return res.json(demo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to update demo status.' });
  }
}
