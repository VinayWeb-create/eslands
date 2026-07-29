import Certificate from '../models/Certificate.js';
import User from '../models/User.js';
import Lead from '../models/Lead.js';
import { generateCertificatePDF } from '../config/pdfService.js';
import { sendCertificateEmail } from '../config/emailService.js';

export async function getCertificates(req, res) {
  try {
    const certs = await Certificate.find().populate('student', 'name email courseOrProjectName');
    return res.json(certs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch certificates.' });
  }
}

export async function createCertificate(req, res) {
  const { studentId, course } = req.body;
  if (!studentId || !course) {
    return res.status(400).json({ message: 'Student ID and Course are required.' });
  }
  try {
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found.' });

    const certificateNumber = `CERT-${String(Date.now()).slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const cert = await Certificate.create({
      certificateNumber,
      student: studentId,
      course,
      status: 'issued'
    });

    if (student.leadRef) {
      const lead = await Lead.findById(student.leadRef);
      if (lead) {
        lead.status = 'certificate_issued';
        lead.notes.push({
          text: `Certificate ${certificateNumber} issued for course: ${course}`,
          createdBy: req.admin._id
        });
        await lead.save();
      }
    }

    // Generate Certificate PDF and send email
    try {
      const pdfBuffer = await generateCertificatePDF(student.name, course, certificateNumber);
      await sendCertificateEmail(student, cert, pdfBuffer);
    } catch (mailErr) {
      console.error('Failed to send certificate email:', mailErr);
    }

    return res.status(201).json(cert);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to create certificate.' });
  }
}

export async function downloadCertificatePDF(req, res) {
  try {
    const cert = await Certificate.findById(req.params.id).populate('student');
    if (!cert) return res.status(404).json({ message: 'Certificate not found.' });

    const pdfBuffer = await generateCertificatePDF(cert.student.name, cert.course, cert.certificateNumber);
    
    cert.status = 'downloaded';
    await cert.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Certificate_${cert.certificateNumber}.pdf`);
    return res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to download certificate.' });
  }
}
