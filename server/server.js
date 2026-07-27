import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/onebridge';

if (!process.env.MONGO_URI) {
  console.warn('Warning: MONGO_URI not defined. Falling back to local MongoDB URI.');
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 20, message: { message: 'Too many requests, please try again later.' } });
app.use('/api/contact', limiter);
app.use('/api/newsletter', limiter);

app.use('/api/contact', contactRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/crm/auth', authRoutes);
app.use('/api/crm/leads', leadRoutes);
app.use('/api/crm/quotes', quoteRoutes);
app.use('/api/crm/dashboard', dashboardRoutes);

app.get('/', (req, res) => res.json({ name: 'Esland IT Solutions API', status: 'running', docs: '/api/health' }));
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.use((req, res) => res.status(404).json({ message: 'Endpoint not found.' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error.' });
});

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
