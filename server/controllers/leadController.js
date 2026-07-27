import Lead from '../models/Lead.js';

export async function getLeads(req, res) {
  try {
    const { status, priority, service, source, search, sort = '-createdAt', page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (service) filter.service = service;
    if (source) filter.source = source;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ];
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [leads, total] = await Promise.all([
      Lead.find(filter).sort(sort).skip(skip).limit(parseInt(limit)).populate('assignedTo', 'name email'),
      Lead.countDocuments(filter),
    ]);
    return res.json({ leads, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch leads.' });
  }
}

export async function getLeadById(req, res) {
  try {
    const lead = await Lead.findById(req.params.id).populate('assignedTo', 'name email').populate('contactRef');
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    return res.json(lead);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch lead.' });
  }
}

export async function createLead(req, res) {
  const { name, email, phone, service, subject, message, priority, assignedTo } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }
  try {
    const lead = await Lead.create({
      name, email, phone: phone || '', service: service || 'General Inquiry',
      subject: subject || '', message: message || '', source: 'manual',
      priority: priority || 'medium', assignedTo: assignedTo || undefined,
    });
    return res.status(201).json(lead);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to create lead.' });
  }
}

export async function updateLead(req, res) {
  try {
    const allowed = ['name', 'email', 'phone', 'service', 'subject', 'message', 'priority', 'assignedTo', 'lostReason'];
    const updates = {};
    allowed.forEach((field) => { if (req.body[field] !== undefined) updates[field] = req.body[field]; });
    const lead = await Lead.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    return res.json(lead);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to update lead.' });
  }
}

export async function updateLeadStatus(req, res) {
  const { status, lostReason } = req.body;
  const validStatuses = ['new', 'contacted', 'qualified', 'proposal_sent', 'converted', 'lost'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(', ')}` });
  }
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    lead.status = status;
    if (status === 'lost' && lostReason) lead.lostReason = lostReason;
    lead.notes.push({ text: `Status changed to "${status}"${lostReason ? ` — ${lostReason}` : ''}`, createdBy: req.admin._id });
    await lead.save();
    return res.json(lead);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to update lead status.' });
  }
}

export async function addNote(req, res) {
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ message: 'Note text is required.' });
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    lead.notes.push({ text: text.trim(), createdBy: req.admin._id });
    await lead.save();
    return res.json(lead);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to add note.' });
  }
}

export async function deleteLead(req, res) {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    return res.json({ message: 'Lead deleted.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to delete lead.' });
  }
}
