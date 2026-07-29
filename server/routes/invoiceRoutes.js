import express from 'express';
import { getInvoices, downloadInvoicePDF } from '../controllers/invoiceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getInvoices);
router.get('/:id/pdf', downloadInvoicePDF);

export default router;
