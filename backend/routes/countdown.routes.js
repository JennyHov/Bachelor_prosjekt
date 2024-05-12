import express from 'express';
import { setCountdown, getCountdown } from '../Controllers/countdown.controller.js';
import { verifiedToken, isAdmin } from '../utils/verifiedToken.js';

const router = express.Router();

router.post('/set', verifiedToken, isAdmin, setCountdown);
router.get('/get', getCountdown);

export default router;
