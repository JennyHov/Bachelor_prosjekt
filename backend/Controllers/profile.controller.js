

import Profile from '../models/profile.model.js';


// både en update og create metode for å lage sin egen collaborate profile/samarbeidsprofil
export const createOrUpdateProfile = async (req, res) => {
    const { fullName, email, institution, description, category, role, profileImageUrl } = req.body; // har et profileimageurl, men ikke nødvendigvis brukt
    const userId = req.user.id;

    try {
        let profile = await Profile.findOne({ user: userId });
        if (!profile) {
            profile = new Profile({ fullName, email, institution, description, category, role, user: userId, profileImageUrl }); 
            await profile.save();
        } else {
            if (profile.user.toString() !== userId) {
                return res.status(403).json({ message: "Not authorized to update this profile" });
            }
            profile = await Profile.findByIdAndUpdate(profile._id, { fullName, email, institution, description, category, role, profileImageUrl }, { new: true }); 
        }
        console.log("Profile updated successfully:", profile);
        res.status(200).json(profile);
    } catch (error) {
        console.error("Error at profile creation/update:", error);
        res.status(500).json({ message: error.message });
    }
};




// hent alle collaborateprofiler for matchingtjenesten

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', 'profileImage'); 
        res.status(200).json(profiles.map(profile => ({
            ...profile.toObject(),
            profileImage: profile.user.profileImage 
        })));
    } catch (error) {
        console.error("Failed to fetch profiles:", error);
        res.status(500).json({ message: error.message });
    }
};


// hente en collaborateprofil basert på user iden deres fra database

export const getProfileByUserId = async (req, res) => {
    try {
        const userId = req.params.userId; 
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// søkebaren for matchingtjenesten med enkelt filtrering for feltene instituition,role og category. 
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

// slette sin egen collaborate profile
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
