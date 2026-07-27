import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

export async function submitContact(req, res) {
  const { name, email, phone, subject, service, message } = req.body;
  try {
    const selectedService = service || 'General Inquiry';
    const contact = new Contact({ name, email, phone, subject, service: selectedService, message });
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
        subject: `New contact request: ${subject} [${selectedService}]`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService Selected: ${selectedService}\nSubject: ${subject}\nMessage:\n${message}`,
      });
    }

    return res.status(201).json({ message: 'Contact request submitted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while submitting contact form.' });
  }
}
