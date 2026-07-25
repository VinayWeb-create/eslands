import Career from '../models/Career.js';

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
  return res.status(200).json({ message: 'Application submitted successfully.' });
}
