import nodemailer from 'nodemailer';

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;
  
  if (user && pass && !user.includes('example.com')) {
    // If a custom SMTP server is specified
    if (host && port) {
      return nodemailer.createTransport({
        host,
        port: parseInt(port, 10),
        secure: parseInt(port, 10) === 465, // true for 465, false for 587 or other ports
        auth: { user, pass }
      });
    }
    // Default to Gmail service fallback
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }
  return null;
}

const companyName = 'Esland IT Solutions';
const supportEmail = 'support@eslanditsolutions.com';
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

function wrapHtml(title, body) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px border #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #0ea5e9, #4f46e5); padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; }
        .content { padding: 40px 30px; line-height: 1.6; }
        .content p { font-size: 15px; margin-bottom: 20px; color: #334155; }
        .button { display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #0ea5e9, #4f46e5); color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; margin-top: 10px; margin-bottom: 20px; }
        .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .footer a { color: #0ea5e9; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${title}</h1>
        </div>
        <div class="content">
          ${body}
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
          <p>For support, contact us at <a href="mailto:${supportEmail}">${supportEmail}</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendEmail({ to, subject, html, attachments }) {
  const transporter = getTransporter();
  const from = process.env.EMAIL_USER || 'noreply@eslanditsolutions.com';

  if (!transporter) {
    console.log(`[EMAIL LOGGER] - Mail Simulation:
      From: ${from}
      To: ${to}
      Subject: ${subject}
      Attachments Count: ${attachments ? attachments.length : 0}
      HTML Body: ${html.substring(0, 300)}...
    `);
    return true;
  }

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      attachments
    });
    return true;
  } catch (error) {
    console.error('[EMAIL ERROR] Failed to send email:', error);
    return false;
  }
}

export async function sendLeadReceivedEmail(lead) {
  const html = wrapHtml(
    'Enquiry Received Successfully',
    `
      <p>Dear ${lead.name},</p>
      <p>Thank you for reaching out to <strong>${companyName}</strong>. We have successfully received your enquiry regarding <strong>${lead.service}</strong>.</p>
      <p>One of our sales representatives or training advisors will review your enquiry and get back to you within 24 hours.</p>
      <p>Best regards,<br>The ${companyName} Team</p>
    `
  );
  return sendEmail({ to: lead.email, subject: `We have received your enquiry - ${companyName}`, html });
}

export async function sendDemoConfirmationEmail(lead, demo) {
  const html = wrapHtml(
    'Demo Session Confirmed',
    `
      <p>Dear ${lead.name},</p>
      <p>Your demo session for <strong>${lead.service}</strong> has been scheduled and confirmed.</p>
      <p><strong>Session Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${demo.demoDate}</li>
        <li><strong>Time:</strong> ${demo.demoTime}</li>
        ${demo.trainer ? `<li><strong>Trainer:</strong> ${demo.trainer}</li>` : ''}
      </ul>
      <p>Please join the session using the button below:</p>
      <p style="text-align: center;">
        <a href="${demo.meetingLink || '#'}" class="button" target="_blank">Join Demo Session</a>
      </p>
      <p>We look forward to seeing you there!</p>
      <p>Best regards,<br>The ${companyName} Team</p>
    `
  );
  return sendEmail({ to: lead.email, subject: `Demo Confirmed: ${lead.service} - ${companyName}`, html });
}

export async function sendDemoReminderEmail(lead, demo) {
  const html = wrapHtml(
    'Demo Session Reminder',
    `
      <p>Dear ${lead.name},</p>
      <p>This is a quick reminder that your demo session for <strong>${lead.service}</strong> starts soon.</p>
      <p><strong>Session Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${demo.demoDate}</li>
        <li><strong>Time:</strong> ${demo.demoTime}</li>
      </ul>
      <p style="text-align: center;">
        <a href="${demo.meetingLink || '#'}" class="button" target="_blank">Join Demo Session Now</a>
      </p>
      <p>Best regards,<br>The ${companyName} Team</p>
    `
  );
  return sendEmail({ to: lead.email, subject: `Reminder: Demo Session for ${lead.service} - ${companyName}`, html });
}

export async function sendQuoteEmail(lead, quote, pdfBuffer) {
  const acceptUrl = `${clientUrl}/quotes/public-accept/${quote._id}`;
  const html = wrapHtml(
    'Your Quotation Proposal',
    `
      <p>Dear ${lead.name},</p>
      <p>Please find attached our quotation proposal <strong>${quote.quoteNumber}</strong> for the requested services.</p>
      <p><strong>Summary:</strong></p>
      <ul>
        <li><strong>Quote Number:</strong> ${quote.quoteNumber}</li>
        <li><strong>Total Amount:</strong> £${quote.total.toLocaleString()}</li>
        <li><strong>Valid Until:</strong> ${new Date(quote.validUntil).toLocaleDateString()}</li>
      </ul>
      <p>Please click the button below to accept this proposal and proceed to secure checkout:</p>
      <p style="text-align: center;">
        <a href="${acceptUrl}" class="button">Accept & Confirm Proposal</a>
      </p>
      <p>The detailed breakdown is also attached as a PDF. Please review and feel free to reach out with any adjustments.</p>
      <p>Best regards,<br>The ${companyName} Team</p>
    `
  );
  return sendEmail({
    to: lead.email,
    subject: `Quotation Proposal ${quote.quoteNumber} - ${companyName}`,
    html,
    attachments: [{ filename: `${quote.quoteNumber}.pdf`, content: pdfBuffer }]
  });
}

export async function sendPaymentRequestEmail(lead, quote) {
  const checkoutUrl = `${clientUrl}/pay/${lead._id}`;
  const html = wrapHtml(
    'Quotation Acceptance & Payment Request',
    `
      <p>Dear ${lead.name},</p>
      <p>We are delighted that you have accepted our quotation proposal <strong>${quote.quoteNumber}</strong>!</p>
      <p>To finalize your enrollment/project kickoff, please complete your secure payment online by clicking the button below:</p>
      <p style="text-align: center;">
        <a href="${checkoutUrl}" class="button" target="_blank">Complete Payment Online</a>
      </p>
      <p><strong>Payment Summary:</strong></p>
      <ul>
        <li><strong>Service/Course:</strong> ${lead.service}</li>
        <li><strong>Quote Amount:</strong> £${quote.total.toLocaleString()}</li>
      </ul>
      <p>Once your payment is verified, you will immediately receive your tax invoice receipt and access details to your personal portal space.</p>
      <p>Best regards,<br>The ${companyName} Team</p>
    `
  );
  return sendEmail({ to: lead.email, subject: `Action Required: Complete your payment - ${companyName}`, html });
}

export async function sendPaymentConfirmationEmail(lead, payment) {
  const html = wrapHtml(
    'Payment Confirmed',
    `
      <p>Dear ${lead.name},</p>
      <p>Thank you for your payment. We have successfully processed your transaction.</p>
      <p><strong>Transaction Summary:</strong></p>
      <ul>
        <li><strong>Amount Paid:</strong> £${payment.amount.toLocaleString()}</li>
        <li><strong>Transaction ID:</strong> ${payment.transactionId || 'N/A'}</li>
        <li><strong>Payment Method:</strong> ${payment.method}</li>
        <li><strong>Date:</strong> ${new Date(payment.date).toLocaleDateString()}</li>
      </ul>
      <p>An official invoice has been generated for your record.</p>
      <p>Best regards,<br>The ${companyName} Team</p>
    `
  );
  return sendEmail({ to: lead.email, subject: `Payment Received Confirmation - ${companyName}`, html });
}

export async function sendInvoiceEmail(lead, invoice, pdfBuffer) {
  const html = wrapHtml(
    'Your Invoice is Ready',
    `
      <p>Dear ${lead.name},</p>
      <p>Thank you for your business. Please find attached the official invoice <strong>${invoice.invoiceNumber}</strong>.</p>
      <p><strong>Invoice Details:</strong></p>
      <ul>
        <li><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</li>
        <li><strong>Grand Total:</strong> £${invoice.total.toLocaleString()}</li>
        <li><strong>Date of Issue:</strong> ${new Date(invoice.issuedAt).toLocaleDateString()}</li>
      </ul>
      <p>The itemized invoice document is attached as a PDF for your records.</p>
      <p>Best regards,<br>The ${companyName} Team</p>
    `
  );
  return sendEmail({
    to: lead.email,
    subject: `Invoice ${invoice.invoiceNumber} from ${companyName}`,
    html,
    attachments: [{ filename: `${invoice.invoiceNumber}.pdf`, content: pdfBuffer }]
  });
}

export async function sendEnrollmentConfirmationEmail(lead, user, plainPassword) {
  const html = wrapHtml(
    'Your Account Credentials',
    `
      <p>Dear ${lead.name},</p>
      <p>Welcome to <strong>${companyName}</strong>! Your portal account has been set up successfully.</p>
      <p><strong>Your Access Details:</strong></p>
      <ul>
        <li><strong>Role:</strong> ${user.role === 'student' ? 'Student' : 'Client'}</li>
        <li><strong>Portal Login URL:</strong> <a href="${clientUrl}/portal/login">${clientUrl}/portal/login</a></li>
        <li><strong>Username / Email:</strong> ${user.email}</li>
        <li><strong>Password:</strong> ${plainPassword}</li>
      </ul>
      <p>Please log in and update your password on your first session.</p>
      <p>Best regards,<br>The ${companyName} Team</p>
    `
  );
  return sendEmail({ to: lead.email, subject: `Welcome to Esland: Portal Login Access - ${companyName}`, html });
}

export async function sendCertificateEmail(user, certificate, pdfBuffer) {
  const html = wrapHtml(
    'Course Certification Issued!',
    `
      <p>Dear ${user.name},</p>
      <p>Congratulations! You have successfully completed the course: <strong>${certificate.course}</strong>.</p>
      <p>We are delighted to issue your official digital certificate of completion. Please find it attached to this email.</p>
      <p><strong>Certificate Details:</strong></p>
      <ul>
        <li><strong>Certificate Number:</strong> ${certificate.certificateNumber}</li>
        <li><strong>Course Completed:</strong> ${certificate.course}</li>
        <li><strong>Issued Date:</strong> ${new Date(certificate.issuedDate).toLocaleDateString()}</li>
      </ul>
      <p>You can also download this at any time from your Student Portal.</p>
      <p>Keep up the great work and best of luck in your career journey!</p>
      <p>Best regards,<br>The ${companyName} Team</p>
    `
  );
  return sendEmail({
    to: user.email,
    subject: `Congratulations: Your Certificate is Ready! - ${companyName}`,
    html,
    attachments: [{ filename: `Certificate_${certificate.certificateNumber}.pdf`, content: pdfBuffer }]
  });
}
