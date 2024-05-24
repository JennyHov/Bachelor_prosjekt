import express from 'express';
import { updateBasicInfo, updatePassword, deleteUser } from '../Controllers/user.controller.js';
import { verifiedToken } from '../utils/authenticatedUser.js';

const router = express.Router();


router.post('/update-basic-info/:id', verifiedToken, updateBasicInfo); 
router.post('/update-password/:id', verifiedToken, updatePassword);
router.delete('/delete/:id', verifiedToken, deleteUser);



export default router;