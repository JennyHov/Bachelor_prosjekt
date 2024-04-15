import express from 'express';
import { submitCounselingForm } from '../Controllers/counselingForm.controller.js';

const router = express.Router();

router.post('/submit-counseling-form', submitCounselingForm);

export default router;