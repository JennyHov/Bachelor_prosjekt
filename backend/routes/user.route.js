import express from 'express';
import { test, updateUser, deleteUser, changePassword } from '../Controllers/user.controller.js';
import { verifiedToken } from '../utils/authenticatedUser.js';

const router = express.Router();


router.get('/', test);
router.post("/update/:id", verifiedToken, updateUser);
router.delete("/delete/:id", verifiedToken, deleteUser);
router.post('/:userId/change-password', verifiedToken, changePassword);

export default router;