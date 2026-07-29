import express from 'express';
import { getDemos, createDemo, updateDemoStatus } from '../controllers/demoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getDemos);
router.post('/', createDemo);
router.put('/:id/status', updateDemoStatus);

export default router;
