import express from 'express';
import { updateBasicInfo, updatePassword} from '../Controllers/user.controller.js';
import { verifiedToken } from '../utils/authenticatedUser.js';

const router = express.Router();


router.post('/update-basic-info/:id', verifiedToken, updateBasicInfo); 
router.post('/update-password/:id', verifiedToken, updatePassword);


export default router;