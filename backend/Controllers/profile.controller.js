

import Profile from '../models/profile.model.js';


export const createOrUpdateProfile = async (req, res) => {
    const { fullName, email, institution, description, category, role } = req.body;
    const userId = req.user.id;

    try {
        const existingProfile = await Profile.findOne({ user: userId });
        if (existingProfile) {
            console.log("Updating existing profile for user ID:", userId);
            const updatedProfile = await Profile.findByIdAndUpdate(existingProfile._id, { fullName, email, institution, description, category, role }, { new: true });
            console.log("Profile updated successfully:", updatedProfile);
            res.status(200).json(updatedProfile);
        } else {
            console.log("No existing profile found. Creating new one.");
            const profile = new Profile({ fullName, email, institution, description, category, role, user: userId });
            await profile.save();
            console.log("Profile created successfully:", profile);
            res.status(201).json(profile);
        }
    } catch (error) {
        console.error("Error at profile creation/update:", error);
        res.status(500).json({ message: error.message });
    }
};



// controllers/profile.controller.js

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        console.error("Failed to fetch profiles:", error);
        res.status(500).json({ message: error.message });
    }
};

// controllers/profile.controller.js

// controllers/profile.controller.js

export const getProfileByUserId = async (req, res) => {
    try {
        const userId = req.params.userId; // Or req.user.id if you want to fetch the profile of the logged-in user directly
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// controllers/profile.controller.js

export const deleteProfile = async (req, res) => {
    const profileId = req.params.id;
    const userId = req.user.id;  // Assuming req.user is populated from the verifiedToken middleware

    try {
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // Check if the current user is the profile owner or an admin
        if (profile.user.toString() === userId || req.user.role === 'admin') {
            await Profile.deleteOne({ _id: profileId });
            res.status(200).json({ message: "Profile deleted successfully" });
        } else {
            res.status(403).json({ message: "Not authorized to delete this profile" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

