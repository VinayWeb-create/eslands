import express from 'express';
import { portalLogin, getPortalDashboard } from '../controllers/portalController.js';
import { downloadInvoicePDF } from '../controllers/invoiceController.js';
import { downloadQuotePDF, acceptQuotePortal } from '../controllers/quoteController.js';
import { downloadCertificatePDF } from '../controllers/certificateController.js';
import { protectPortal } from '../middleware/portalAuth.js';

const router = express.Router();

router.post('/login', portalLogin);
router.get('/dashboard', protectPortal, getPortalDashboard);
router.get('/quotes/:id/pdf', protectPortal, downloadQuotePDF);
router.put('/quotes/:id/accept', protectPortal, acceptQuotePortal);
router.get('/invoices/:id/pdf', protectPortal, downloadInvoicePDF);
router.get('/certificates/:id/pdf', protectPortal, downloadCertificatePDF);

export default router;
