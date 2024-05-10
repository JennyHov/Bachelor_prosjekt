import express from 'express';
import { getAllUsers, updateUserRole, deleteUser, getAllCollaborateProfiles, deleteCollaborateProfile, updateCollaborateProfile } from '../Controllers/admin.controller.js';
import { verifiedToken, isAdmin } from '../utils/verifiedToken.js';

const router = express.Router();

router.get('/users', verifiedToken, getAllUsers); 
router.patch('/users/role', verifiedToken, isAdmin, updateUserRole);
router.delete('/users/:userId', verifiedToken, isAdmin, deleteUser);
router.get('/collaborate-profiles', verifiedToken, isAdmin, getAllCollaborateProfiles);
router.delete('/collaborate-profiles/:profileId', verifiedToken, isAdmin, deleteCollaborateProfile);
router.put('/collaborate-profiles/:profileId', verifiedToken, isAdmin, updateCollaborateProfile);  // Added PUT route



export default router;



