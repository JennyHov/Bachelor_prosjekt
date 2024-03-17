import express from 'express';
import { test, updatingUser } from '../Controllers/user.controller.js';
import { verifiedToken } from '../utils/authenticatedUser.js';

const router = express.Router();


router.get('/', test);
router.post("/update/:id", verifiedToken, updatingUser);

export default router;