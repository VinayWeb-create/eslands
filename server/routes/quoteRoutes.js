import express from 'express';
import { getQuotes, getQuoteById, createQuote, updateQuote, updateQuoteStatus, deleteQuote } from '../controllers/quoteController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getQuotes);
router.get('/:id', getQuoteById);
router.post('/', createQuote);
router.put('/:id', updateQuote);
router.put('/:id/status', updateQuoteStatus);
router.delete('/:id', deleteQuote);

export default router;
