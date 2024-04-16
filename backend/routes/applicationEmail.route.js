import express from 'express';
import { submitApplicationEmail } from '../Controllers/applicationEmail.controller.js';

const router = express.Router();

router.post('/submit-application-email', submitApplicationEmail);

export default router;
