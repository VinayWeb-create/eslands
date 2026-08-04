import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Career from './models/Career.js';
import Admin from './models/Admin.js';

dotenv.config();

const careers = [
  { title: 'Senior Cloud Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', description: 'Design and operate secure cloud infrastructure for enterprise clients.', requirements: ['AWS/Azure expertise', 'Infrastructure as code', 'Container orchestration'] },
  { title: 'AI Solutions Architect', department: 'Product', location: 'Hybrid', type: 'Full-time', description: 'Lead AI-enabled solution design and deployment across product portfolios.', requirements: ['ML workflows', 'API integration', 'UX-focused systems'] },
  { title: 'Cybersecurity Analyst', department: 'Security', location: 'On-site', type: 'Full-time', description: 'Protect applications and networks with modern security controls and monitoring.', requirements: ['Threat detection', 'incident response', 'compliance'] },
  { title: 'DevOps Engineer', department: 'Operations', location: 'Remote', type: 'Full-time', description: 'Build CI/CD pipelines, observability, and scalable release automation.', requirements: ['Kubernetes', 'CI/CD tooling', 'monitoring'] },
];

const defaultAdmin = {
  name: 'Admin',
  email: 'admin@eslanditsolutions.com',
  password: 'admin123',
  role: 'admin',
};

async function seed() {
  await connectDB(process.env.MONGO_URI);
  await Career.deleteMany({});
  await Career.create(careers);
  console.log('Seeded careers data');

  await Admin.deleteMany({});
  await Admin.create(defaultAdmin);
  console.log('Seeded default admin: admin@eslanditsolutions.com / admin123');

  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
