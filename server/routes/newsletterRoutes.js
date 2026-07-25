import express from 'express';
import { body } from 'express-validator';
import { subscribeNewsletter } from '../controllers/newsletterController.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

router.post(
  '/',
  [body('email').trim().isEmail().withMessage('Valid email is required')],
  validateRequest,
  subscribeNewsletter
);

export default router;
