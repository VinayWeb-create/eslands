import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const host = process.env.EMAIL_HOST;
const port = process.env.EMAIL_PORT;

console.log('--- Nodemailer SMTP Tester ---');
console.log(`EMAIL_USER: ${user || '(not set)'}`);
console.log(`EMAIL_PASS: ${pass ? '********' : '(not set)'}`);
console.log(`EMAIL_HOST: ${host || 'gmail (default)'}`);
console.log(`EMAIL_PORT: ${port || '465/587'}\n`);

if (!user || !pass || user.includes('example.com')) {
  console.log('❌ Error: EMAIL_USER and EMAIL_PASS must be configured with real credentials in .env.');
  process.exit(1);
}

let transporter;

if (host && port) {
  transporter = nodemailer.createTransport({
    host,
    port: parseInt(port, 10),
    secure: parseInt(port, 10) === 465,
    auth: { user, pass }
  });
} else {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
}

console.log('Connecting to SMTP server...');

transporter.verify((error, success) => {
  if (error) {
    console.log('\n❌ SMTP Connection Failed!');
    console.error(error);
  } else {
    console.log('\n✅ SMTP Connection Successful! Your credentials are correct and nodemailer is ready.');
  }
});
