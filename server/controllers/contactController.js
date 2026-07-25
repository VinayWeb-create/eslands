import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

export async function submitContact(req, res) {
  const { name, email, phone, subject, message } = req.body;
  try {
    const contact = new Contact({ name, email, phone, subject, message });
    await contact.save();

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New contact request: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`,
      });
    }

    return res.status(201).json({ message: 'Contact request submitted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while submitting contact form.' });
  }
}
