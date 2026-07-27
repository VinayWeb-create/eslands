import Lead from '../models/Lead.js';
import Quote from '../models/Quote.js';
import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';

export async function getStats(req, res) {
  try {
    const [
      totalLeads, newLeads, contactedLeads, qualifiedLeads, proposalLeads, convertedLeads, lostLeads,
      totalQuotes, draftQuotes, sentQuotes, acceptedQuotes, rejectedQuotes,
      totalContacts, totalSubscribers,
      recentLeads, recentQuotes,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'new' }),
      Lead.countDocuments({ status: 'contacted' }),
      Lead.countDocuments({ status: 'qualified' }),
      Lead.countDocuments({ status: 'proposal_sent' }),
      Lead.countDocuments({ status: 'converted' }),
      Lead.countDocuments({ status: 'lost' }),
      Quote.countDocuments(),
      Quote.countDocuments({ status: 'draft' }),
      Quote.countDocuments({ status: 'sent' }),
      Quote.countDocuments({ status: 'accepted' }),
      Quote.countDocuments({ status: 'rejected' }),
      Contact.countDocuments(),
      Newsletter.countDocuments(),
      Lead.find().sort({ createdAt: -1 }).limit(5).select('name email status service createdAt'),
      Quote.find().sort({ createdAt: -1 }).limit(5).populate('lead', 'name email').select('quoteNumber total status createdAt'),
    ]);

    const revenueResult = await Quote.aggregate([
      { $match: { status: 'accepted' } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    const pendingValueResult = await Quote.aggregate([
      { $match: { status: { $in: ['draft', 'sent'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const pendingValue = pendingValueResult.length > 0 ? pendingValueResult[0].total : 0;

    const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

    return res.json({
      leads: { total: totalLeads, new: newLeads, contacted: contactedLeads, qualified: qualifiedLeads, proposal: proposalLeads, converted: convertedLeads, lost: lostLeads },
      quotes: { total: totalQuotes, draft: draftQuotes, sent: sentQuotes, accepted: acceptedQuotes, rejected: rejectedQuotes },
      contacts: totalContacts,
      subscribers: totalSubscribers,
      revenue: { total: Math.round(totalRevenue * 100) / 100, pending: Math.round(pendingValue * 100) / 100 },
      conversionRate,
      recentLeads,
      recentQuotes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch dashboard stats.' });
  }
}
