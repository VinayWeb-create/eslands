import express from 'express';
import { login, getMe, registerAdmin } from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/register', protect, adminOnly, registerAdmin);

export default router;
