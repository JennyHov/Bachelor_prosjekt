import express from 'express';
import { submitContactForm } from '../Controllers/contactForm.controller.js';

const router = express.Router();

router.post('/submit-contact-form', submitContactForm);

export default router;