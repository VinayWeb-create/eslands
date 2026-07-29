import express from 'express';
import { getPayments, createPayment } from '../controllers/paymentController.js';
import { createRazorpayOrder, verifyRazorpayPayment, getPublicCheckoutDetails } from '../controllers/razorpayController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public Payment Gateway Callback Routes
router.post('/razorpay/order', createRazorpayOrder);
router.post('/razorpay/verify', verifyRazorpayPayment);
router.get('/public-checkout/:leadId', getPublicCheckoutDetails);

// CRM Staff Log Routes
router.get('/', protect, getPayments);
router.post('/', protect, createPayment);

export default router;
