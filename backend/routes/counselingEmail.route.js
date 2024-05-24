import express from 'express';
import multer from 'multer';
import { submitCounselingEmail } from '../Controllers/counselingEmail.controller.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/submit-counseling-email', upload.single('file'), submitCounselingEmail);

export default router;
