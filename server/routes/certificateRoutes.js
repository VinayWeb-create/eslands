import express from 'express';
import { getCertificates, createCertificate, downloadCertificatePDF } from '../controllers/certificateController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getCertificates);
router.post('/', createCertificate);
router.get('/:id/pdf', downloadCertificatePDF);

export default router;
