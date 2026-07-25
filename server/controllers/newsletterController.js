import Newsletter from '../models/Newsletter.js';

export async function subscribeNewsletter(req, res) {
  const { email } = req.body;
  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already subscribed.' });
    }
    const subscriber = new Newsletter({ email });
    await subscriber.save();
    return res.status(201).json({ message: 'Subscribed successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to subscribe.' });
  }
}
