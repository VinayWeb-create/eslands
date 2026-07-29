import express from 'express';
import { 
  getLeads, getLeadById, createLead, updateLead, 
  updateLeadStatus, addNote, deleteLead, createPortalAccount 
} from '../controllers/leadController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.post('/:id/portal', createPortalAccount);
router.put('/:id', updateLead);
router.put('/:id/status', updateLeadStatus);
router.post('/:id/notes', addNote);
router.delete('/:id', deleteLead);

export default router;
