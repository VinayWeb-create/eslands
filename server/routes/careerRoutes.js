import express from 'express';
import { body } from 'express-validator';
import { getCareers, submitApplication } from '../controllers/careerController.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

router.get('/', getCareers);

router.post(
  '/apply',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('position').trim().notEmpty().withMessage('Position is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  validateRequest,
  submitApplication
);

export default router;
