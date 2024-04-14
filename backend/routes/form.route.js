import express from 'express';
import { submitApplication } from '../Controllers/form.controller.js';

const router = express.Router();

router.post('/submit-application', submitApplication);

export default router;
