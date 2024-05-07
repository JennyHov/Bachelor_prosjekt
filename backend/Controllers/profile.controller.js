

import Profile from '../models/profile.model.js';

export const createOrUpdateProfile = async (req, res) => {
    const { fullName, email, institution, description, category, role, profileImageUrl } = req.body; // include profileImageUrl in the destructuring
    const userId = req.user.id;

    try {
        let profile = await Profile.findOne({ user: userId });
        if (!profile) {
            profile = new Profile({ fullName, email, institution, description, category, role, user: userId, profileImageUrl }); // include profileImageUrl here
            await profile.save();
        } else {
            if (profile.user.toString() !== userId) {
                return res.status(403).json({ message: "Not authorized to update this profile" });
            }
            profile = await Profile.findByIdAndUpdate(profile._id, { fullName, email, institution, description, category, role, profileImageUrl }, { new: true }); // and here
        }
        console.log("Profile updated successfully:", profile);
        res.status(200).json(profile);
    } catch (error) {
        console.error("Error at profile creation/update:", error);
        res.status(500).json({ message: error.message });
    }
};




// controllers/profile.controller.js

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', 'profileImage'); // Adjusting to include profile image from user
        res.status(200).json(profiles.map(profile => ({
            ...profile.toObject(),
            profileImage: profile.user.profileImage // Assuming profile.user is populated
        })));
    } catch (error) {
        console.error("Failed to fetch profiles:", error);
        res.status(500).json({ message: error.message });
    }
};


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


// Server-side controller to handle the search
export const searchProfiles = async (req, res) => {
    const { search, institution, role, category } = req.query;
    let query = {};

    if (search) query.fullName = { $regex: search, $options: 'i' };
    if (institution) query.institution = institution;
    if (role) query.role = role;
    if (category) query.category = category;

    try {
        const profiles = await Profile.find(query).populate('user');
        res.json(profiles);
    } catch (error) {
        console.error("Failed to search profiles:", error);
        res.status(500).json({ message: "Internal Server Error - Unable to search profiles" });
    }
};

// controllers/profile.controller.js
export const deleteUserProfile = async (req, res) => {
    console.log(`Attempting to delete profile for user with ID: ${req.params.userId}`);
    try {
        const profile = await Profile.findOneAndDelete({ user: req.params.userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
