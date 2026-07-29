# Document 05: Backend Development Workflow

## Backend Developer Starts Building

The backend developer picks up the "Contact Form API" and "Admin Login" tasks from Sprint 1.

## 5.1 Creating the Feature Branch

```bash
git checkout dev
git pull origin dev
git checkout -b feature/contact-api
```

## 5.2 Setting Up the Server

### Installing Dependencies

```bash
cd server
npm install
```

### Key Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| express | Web framework | 4.x |
| mongoose | MongoDB ODM | 8.x |
| bcryptjs | Password hashing | 2.x |
| jsonwebtoken | JWT auth | 9.x |
| nodemailer | Email | 6.x |
| helmet | Security headers | 7.x |
| cors | Cross-origin | 2.x |
| express-rate-limit | Rate limiting | 7.x |
| morgan | HTTP logging | 1.x |
| dotenv | Env loading | 16.x |

### Environment Variables

Create `server/.env`:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/onebridge?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=<random-64-chars>
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
CORS_ORIGIN=http://localhost:5173
```

## 5.3 Server Entry Point

### File: `server/server.js`

```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routes
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

// Middleware stack
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting on public endpoints
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { message: 'Too many requests, please try again later.' }
});
app.use('/api/contact', limiter);
app.use('/api/newsletter', limiter);

// Route mounting
app.use('/api/contact', contactRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/crm/auth', authRoutes);
app.use('/api/crm/leads', leadRoutes);
app.use('/api/crm/quotes', quoteRoutes);
app.use('/api/crm/dashboard', dashboardRoutes);

// Health check
app.get('/', (req, res) => res.json({ name: 'Esland IT Solutions API', status: 'running' }));
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// Error handling
app.use((req, res) => res.status(404).json({ message: 'Endpoint not found.' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error.' });
});

// Start server after DB connection
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
```

## 5.4 Building the Contact Form API

### Step 1: Create the Model

**File: `server/models/Contact.js`**

```javascript
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  service: String,
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', contactSchema);
```

### Step 2: Create the Controller

**File: `server/controllers/contactController.js`**

```javascript
import Contact from '../models/Contact.js';
import Lead from '../models/Lead.js';
import nodemailer from 'nodemailer';

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    // Save contact
    const contact = await Contact.create({ name, email, phone, subject, service, message });

    // Auto-create CRM lead (bridge between public website and CRM)
    let newLead = null;
    const existingLead = await Lead.findOne({ email });
    if (!existingLead) {
      newLead = await Lead.create({
        name, email, phone, service, subject, message,
        source: 'contact-form',
        contactRef: contact._id
      });
    }

    // Send email notification (graceful failure)
    try {
      if (process.env.EMAIL_USER !== 'your-email@example.com') {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Contact: ${subject || 'No Subject'}`,
          html: `<p><strong>From:</strong> ${name} (${email})</p>
                 <p><strong>Service:</strong> ${service || 'Not specified'}</p>
                 <p><strong>Message:</strong> ${message}</p>`
        });
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError.message);
    }

    res.status(201).json({ message: 'Contact form submitted successfully.', contact, newLead });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};
```

### Step 3: Create the Route

**File: `server/routes/contactRoutes.js`**

```javascript
import express from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();
router.post('/', submitContact);

export default router;
```

### Step 4: Mount in Server

Already in `server.js`:
```javascript
app.use('/api/contact', contactRoutes);
```

### Step 5: Test

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello","service":"web-development"}'
```

Expected: `201 Created` with contact and lead data.

## 5.5 Building the Admin Authentication

### Step 1: Admin Model

**File: `server/models/Admin.js`**

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },  // Hidden from queries
  role: { type: String, enum: ['admin', 'manager', 'viewer'], default: 'admin' },
  lastLogin: { type: Date }
});

// Auto-hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('Admin', adminSchema);
```

### Step 2: Auth Middleware

**File: `server/middleware/auth.js`**

```javascript
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Protect routes — verify JWT
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Admin-only access
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized as admin' });
  }
  next();
};

// Generate JWT token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
```

### Step 3: Auth Controller

**File: `server/controllers/authController.js`**

```javascript
import Admin from '../models/Admin.js';
import { generateToken } from '../middleware/auth.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  admin.lastLogin = new Date();
  await admin.save();

  res.json({ token: generateToken(admin._id), user: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
};

export const getMe = async (req, res) => {
  res.json(req.user);
};
```

### Step 4: Auth Routes

**File: `server/routes/authRoutes.js`**

```javascript
import express from 'express';
import { login, getMe } from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();
router.post('/login', login);
router.get('/me', protect, adminOnly, getMe);

export default router;
```

## 5.6 Building the Lead Management System

### Lead Model

**File: `server/models/Lead.js`**

Lead statuses track the sales pipeline:
```
new → contacted → qualified → proposal → negotiation → won OR lost
```

```javascript
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  service: { type: String, enum: ['web-development', 'mobile-app', 'digital-marketing', 'cloud-solutions', 'ai-ml', 'cybersecurity', 'other'] },
  subject: String,
  message: String,
  source: { type: String, enum: ['contact-form', 'website', 'referral', 'social-media', 'cold-call', 'other'], default: 'contact-form' },
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'], default: 'new' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  notes: [{
    text: String,
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    addedAt: { type: Date, default: Date.now }
  }],
  lostReason: String,
  contactRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }
}, { timestamps: true });
```

### Lead Controller — Key Methods

```javascript
// Search + filter + paginate leads
export const getLeads = async (req, res) => {
  const { search, status, priority, service, source, page = 1, limit = 10 } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } }
    ];
  }
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (service) query.service = service;
  if (source) query.source = source;

  const skip = (page - 1) * limit;
  const leads = await Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(+limit);
  const total = await Lead.countDocuments(query);

  res.json({ leads, total, page: +page, pages: Math.ceil(total / limit) });
};

// Add a note to a lead
export const addNote = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  lead.notes.push({ text: req.body.text, addedBy: req.user.id });
  await lead.save();
  res.json({ message: 'Note added', lead });
};
```

## 5.7 Database Seeding

**File: `server/seed.js`**

```javascript
// Seeds 12 career postings + 1 admin user
// Run: node seed.js
// Skips if data already exists
```

Careers seeded:
1. Software Developer (Engineering, Remote)
2. Full-Stack Developer (Engineering, Remote)
3. UI/UX Designer (Design, Hybrid)
4. DevOps Engineer (Engineering, Remote)
5. Project Manager (Management, On-site)
6. QA Engineer (Engineering, Remote)
7. Data Analyst (Data, Hybrid)
8. Cloud Architect (Engineering, Remote)
9. Mobile Developer (Engineering, Remote)
10. Cybersecurity Analyst (Security, On-site)
11. AI/ML Engineer (Data, Remote)
12. Technical Writer (Content, Remote)

## 5.8 Daily Backend Workflow

```bash
# Start server
cd server
node server.js

# Server runs on http://localhost:5000
# API health: http://localhost:5000/api/health
```

### Commit Examples

```
feat: add contact form API with auto-lead creation
feat: add admin authentication with JWT
feat: add lead CRUD with search and filtering
feat: add quote generation with auto-totals
fix: wrap email sending in try-catch
fix: handle missing JWT_SECRET gracefully
```

## 5.9 Backend Files Created in Each Sprint

### Sprint 1
| File | Task |
|------|------|
| server.js | Entry point |
| config/db.js | MongoDB connection |
| models/Contact.js | Contact form data |
| controllers/contactController.js | Contact + auto-lead |
| routes/contactRoutes.js | POST /api/contact |
| middleware/auth.js | JWT + RBAC |
| models/Admin.js | Admin user |
| controllers/authController.js | Login |
| routes/authRoutes.js | Auth routes |
| seed.js | Database seeder |

### Sprint 2
| File | Task |
|------|------|
| models/Lead.js | Lead schema |
| controllers/leadController.js | Lead CRUD |
| routes/leadRoutes.js | Lead routes |

### Sprint 3
| File | Task |
|------|------|
| models/Quote.js | Quote schema |
| controllers/quoteController.js | Quote CRUD |
| routes/quoteRoutes.js | Quote routes |
| controllers/dashboardController.js | Dashboard stats |
| routes/dashboardRoutes.js | Dashboard routes |
