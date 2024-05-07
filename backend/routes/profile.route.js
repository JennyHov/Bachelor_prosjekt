// routes/profile.route.js

import express from 'express';
import { deleteUserProfile, createOrUpdateProfile, getProfiles, getProfileByUserId, searchProfiles } from '../Controllers/profile.controller.js';
import { verifiedToken } from '../utils/authenticatedUser.js'; // Importer verifisering av token

const router = express.Router();

router.post('/profiles', verifiedToken, createOrUpdateProfile);  // Create or update profile
router.get('/profiles', getProfiles);
router.get('/profiles/by-user/:userId', verifiedToken, getProfileByUserId);
router.get('/search', searchProfiles);
router.delete('/profile/delete/:userId', verifiedToken, deleteUserProfile);




export default router;