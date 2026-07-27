import Quote from '../models/Quote.js';
import Lead from '../models/Lead.js';

async function generateQuoteNumber() {
  const count = await Quote.countDocuments();
  return `QT-${String(count + 1).padStart(4, '0')}`;
}

function computeTotals(items, taxRate = 20) {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = Math.round((subtotal * taxRate) / 100 * 100) / 100;
  const total = Math.round((subtotal + taxAmount) * 100) / 100;
  return { subtotal: Math.round(subtotal * 100) / 100, taxAmount, total };
}

export async function getQuotes(req, res) {
  try {
    const { status, search, sort = '-createdAt', page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      const matchingLeads = await Lead.find({ name: { $regex: search, $options: 'i' } }).select('_id');
      filter.$or = [
        { quoteNumber: { $regex: search, $options: 'i' } },
        { lead: { $in: matchingLeads.map((l) => l._id) } },
      ];
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [quotes, total] = await Promise.all([
      Quote.find(filter).sort(sort).skip(skip).limit(parseInt(limit)).populate('lead', 'name email service').populate('createdBy', 'name'),
      Quote.countDocuments(filter),
    ]);
    return res.json({ quotes, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch quotes.' });
  }
}

export async function getQuoteById(req, res) {
  try {
    const quote = await Quote.findById(req.params.id).populate('lead').populate('createdBy', 'name email');
    if (!quote) return res.status(404).json({ message: 'Quote not found.' });
    return res.json(quote);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch quote.' });
  }
}

export async function createQuote(req, res) {
  const { lead: leadId, items, taxRate, notes, validUntil } = req.body;
  if (!leadId || !items || !items.length) {
    return res.status(400).json({ message: 'Lead ID and at least one item are required.' });
  }
  try {
    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    const rate = taxRate || 20;
    const processedItems = items.map((item) => ({
      service: item.service,
      description: item.description || '',
      quantity: item.quantity || 1,
      unitPrice: item.unitPrice,
      total: Math.round((item.quantity || 1) * item.unitPrice * 100) / 100,
    }));
    const { subtotal, taxAmount, total } = computeTotals(processedItems, rate);
    const quoteNumber = await generateQuoteNumber();
    const quote = await Quote.create({
      quoteNumber, lead: leadId, items: processedItems, subtotal,
      taxRate: rate, taxAmount, total, notes: notes || '',
      validUntil: validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdBy: req.admin._id,
    });
    if (lead.status === 'new' || lead.status === 'contacted') {
      lead.status = 'proposal_sent';
      lead.notes.push({ text: `Quote ${quoteNumber} created (Total: £${total.toFixed(2)})`, createdBy: req.admin._id });
      await lead.save();
    }
    return res.status(201).json(quote);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to create quote.' });
  }
}

export async function updateQuote(req, res) {
  try {
    const allowed = ['items', 'taxRate', 'notes', 'validUntil'];
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Quote not found.' });
    if (quote.status === 'accepted' || quote.status === 'rejected') {
      return res.status(400).json({ message: 'Cannot edit a quote that has been accepted or rejected.' });
    }
    if (req.body.items) {
      quote.items = req.body.items.map((item) => ({
        service: item.service,
        description: item.description || '',
        quantity: item.quantity || 1,
        unitPrice: item.unitPrice,
        total: Math.round((item.quantity || 1) * item.unitPrice * 100) / 100,
      }));
    }
    if (req.body.taxRate !== undefined) quote.taxRate = req.body.taxRate;
    if (req.body.notes !== undefined) quote.notes = req.body.notes;
    if (req.body.validUntil) quote.validUntil = req.body.validUntil;
    const { subtotal, taxAmount, total } = computeTotals(quote.items, quote.taxRate);
    quote.subtotal = subtotal;
    quote.taxAmount = taxAmount;
    quote.total = total;
    await quote.save();
    return res.json(quote);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to update quote.' });
  }
}

export async function updateQuoteStatus(req, res) {
  const { status } = req.body;
  const validStatuses = ['draft', 'sent', 'accepted', 'rejected', 'expired'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(', ')}` });
  }
  try {
    const quote = await Quote.findById(req.params.id).populate('lead');
    if (!quote) return res.status(404).json({ message: 'Quote not found.' });
    quote.status = status;
    if (status === 'sent') quote.sentAt = new Date();
    if (status === 'accepted') quote.acceptedAt = new Date();
    if (status === 'rejected') quote.rejectedAt = new Date();
    await quote.save();
    if (quote.lead) {
      const lead = await Lead.findById(quote.lead._id);
      if (lead) {
        lead.notes.push({ text: `Quote ${quote.quoteNumber} status changed to "${status}"`, createdBy: req.admin._id });
        if (status === 'accepted') {
          lead.status = 'converted';
        }
        await lead.save();
      }
    }
    return res.json(quote);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to update quote status.' });
  }
}

export async function deleteQuote(req, res) {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Quote not found.' });
    return res.json({ message: 'Quote deleted.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to delete quote.' });
  }
}
