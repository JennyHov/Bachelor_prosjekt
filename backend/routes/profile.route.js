// routes/profile.route.js

import express from 'express';
import { createOrUpdateProfile, getProfiles, getProfileByUserId, searchProfiles } from '../Controllers/profile.controller.js';
import { verifiedToken } from '../utils/authenticatedUser.js'; // Importer verifisering av token

const router = express.Router();

router.post('/profiles', verifiedToken, createOrUpdateProfile);  // Create or update profile
router.get('/profiles', getProfiles);
router.get('/profiles/by-user/:userId', verifiedToken, getProfileByUserId);
router.get('/search', searchProfiles);




export default router;