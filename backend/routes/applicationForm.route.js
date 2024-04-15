import express from 'express';
import { submitApplication } from '../Controllers/applicationForm.controller.js';

const router = express.Router();

router.post('/submit-application', submitApplication);

export default router;
