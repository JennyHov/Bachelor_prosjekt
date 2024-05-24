import express from 'express';
import multer from 'multer';
import { submitApplicationEmail } from '../Controllers/applicationEmail.controller.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/submit-application-email', upload.single('file'), submitApplicationEmail);

export default router;
