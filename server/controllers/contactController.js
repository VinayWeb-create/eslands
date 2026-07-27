import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';
import Lead from '../models/Lead.js';

export async function submitContact(req, res) {
  const { name, email, phone, subject, service, message } = req.body;
  try {
    const selectedService = service || 'General Inquiry';
    const contact = new Contact({ name, email, phone, subject, service: selectedService, message });
    await contact.save();

    try {
      await Lead.create({
        name, email, phone: phone || '', service: selectedService,
        subject: subject || '', message: message || '', source: 'contact_form',
        contactRef: contact._id,
      });
    } catch (leadErr) {
      console.error('Auto-lead creation failed:', leadErr.message);
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && !process.env.EMAIL_USER.includes('example.com')) {
      try {
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
      } catch (mailErr) {
        console.error('Email notification failed:', mailErr.message);
      }
    }

    return res.status(201).json({ message: 'Contact request submitted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while submitting contact form.' });
  }
}
