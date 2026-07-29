import Lead from '../models/Lead.js';
import Quote from '../models/Quote.js';
import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';
import User from '../models/User.js';
import Certificate from '../models/Certificate.js';
import Demo from '../models/Demo.js';
import Payment from '../models/Payment.js';

export async function getStats(req, res) {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalLeads, todaysLeads, newLeads, contactedLeads, qualifiedLeads, proposalLeads, convertedLeads, lostLeads,
      demoScheduledLeads, activeProjects,
      totalQuotes, draftQuotes, sentQuotes, acceptedQuotes, rejectedQuotes,
      totalContacts, totalSubscribers,
      activeStudents, certificatesIssued,
      pendingPaymentsCount,
      recentLeads, recentQuotes,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: startOfToday } }),
      Lead.countDocuments({ status: 'new' }),
      Lead.countDocuments({ status: 'contacted' }),
      Lead.countDocuments({ status: 'qualified' }),
      Lead.countDocuments({ status: 'proposal_sent' }),
      Lead.countDocuments({ status: 'converted' }),
      Lead.countDocuments({ status: 'lost' }),
      Lead.countDocuments({ status: 'demo_scheduled' }),
      Lead.countDocuments({ status: 'project_started' }),
      Quote.countDocuments(),
      Quote.countDocuments({ status: 'draft' }),
      Quote.countDocuments({ status: 'sent' }),
      Quote.countDocuments({ status: 'accepted' }),
      Quote.countDocuments({ status: 'rejected' }),
      Contact.countDocuments(),
      Newsletter.countDocuments(),
      User.countDocuments({ role: 'student', status: 'active' }),
      Certificate.countDocuments({ status: { $in: ['issued', 'downloaded'] } }),
      Payment.countDocuments({ status: 'pending' }),
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

    // Pull recent activities from historical logs of all Leads
    const allLeadsWithNotes = await Lead.find({ 'notes.0': { $exists: true } })
      .select('name notes')
      .limit(20);
    
    let activities = [];
    allLeadsWithNotes.forEach(l => {
      l.notes.forEach(note => {
        activities.push({
          leadName: l.name,
          text: note.text,
          createdAt: note.createdAt
        });
      });
    });
    // Sort activities by creation date descending and take top 10
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    activities = activities.slice(0, 10);

    return res.json({
      leads: { 
        total: totalLeads, 
        todays: todaysLeads,
        new: newLeads, 
        contacted: contactedLeads, 
        qualified: qualifiedLeads, 
        proposal: proposalLeads, 
        converted: convertedLeads, 
        lost: lostLeads,
        demoScheduled: demoScheduledLeads,
        activeProjects
      },
      quotes: { total: totalQuotes, draft: draftQuotes, sent: sentQuotes, accepted: acceptedQuotes, rejected: rejectedQuotes, pending: draftQuotes + sentQuotes },
      contacts: totalContacts,
      subscribers: totalSubscribers,
      activeStudents,
      certificatesIssued,
      pendingPayments: pendingPaymentsCount,
      revenue: { total: Math.round(totalRevenue * 100) / 100, pending: Math.round(pendingValue * 100) / 100 },
      conversionRate,
      recentLeads,
      recentQuotes,
      activities
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch dashboard stats.' });
  }
}
