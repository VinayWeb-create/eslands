import Contact from '../models/Contact.js';
import Lead from '../models/Lead.js';
import { sendLeadReceivedEmail, sendEmail } from '../config/emailService.js';

export async function submitContact(req, res) {
  const { name, email, phone, subject, service, message, company, country, source } = req.body;
  try {
    const selectedService = service || 'General Inquiry';
    const contact = new Contact({ name, email, phone, subject, service: selectedService, message });
    await contact.save();

    let lead;
    try {
      lead = await Lead.create({
        name, email, phone: phone || '', service: selectedService,
        subject: subject || '', message: message || '', 
        company: company || '', country: country || '',
        source: source || 'contact_form',
        contactRef: contact._id,
      });
      
      // Fire auto email confirmation in the background (no await, doesn't block the client)
      sendLeadReceivedEmail(lead).catch(err => {
        console.error('Auto-lead email dispatch failed:', err.message);
      });
    } catch (leadErr) {
      console.error('Auto-lead creation failed:', leadErr.message);
    }

    const adminEmail = process.env.EMAIL_USER;
    if (adminEmail && !adminEmail.includes('example.com')) {
      // Fire admin notification email in the background (no await)
      sendEmail({
        to: adminEmail,
        subject: `New contact request: ${subject || 'Inquiry'} [${selectedService}]`,
        html: `
          <p><strong>New Contact Inquiry Received:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
            <li><strong>Service:</strong> ${selectedService}</li>
            <li><strong>Subject:</strong> ${subject || 'N/A'}</li>
          </ul>
          <p><strong>Message:</strong></p>
          <p>${message || 'N/A'}</p>
        `
      }).catch(mailErr => {
        console.error('Admin Email notification failed:', mailErr.message);
      });
    }

    return res.status(201).json({ message: 'Contact request submitted successfully.', leadId: lead ? lead._id : null });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while submitting contact form.' });
  }
}
