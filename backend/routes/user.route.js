import express from 'express';
import { test, updatingUser, deleteUser } from '../Controllers/user.controller.js';
import { verifiedToken } from '../utils/authenticatedUser.js';

const router = express.Router();


router.get('/', test);
router.post("/update/:id", verifiedToken, updatingUser);
router.delete("/delete/:id", verifiedToken, deleteUser);

export default router;