import express from 'express';
import { submitContactEmail } from '../Controllers/contactEmail.controller.js';

const router = express.Router();

router.post('/submit-contact-email', submitContactEmail);

export default router;