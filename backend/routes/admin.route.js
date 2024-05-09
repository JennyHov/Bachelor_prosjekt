import express from 'express';
import { getAllUsers, updateUserRole } from '../Controllers/admin.controller.js';
import { verifiedToken, isAdmin } from '../utils/verifiedToken.js';

const router = express.Router();

router.get('/users', verifiedToken, getAllUsers); 
router.patch('/users/role', verifiedToken, isAdmin, updateUserRole);


export default router;
