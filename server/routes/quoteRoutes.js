import express from 'express';
import { 
  getQuotes, getQuoteById, createQuote, updateQuote, 
  updateQuoteStatus, deleteQuote, downloadQuotePDF, emailQuote, publicAcceptQuote 
} from '../controllers/quoteController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public route for email quote acceptance
router.put('/public-accept/:id', publicAcceptQuote);

// CRM Staff protected routes
router.use(protect);

router.get('/', getQuotes);
router.get('/:id', getQuoteById);
router.get('/:id/pdf', downloadQuotePDF);
router.post('/:id/email', emailQuote);
router.post('/', createQuote);
router.put('/:id', updateQuote);
router.put('/:id/status', updateQuoteStatus);
router.delete('/:id', deleteQuote);

export default router;
