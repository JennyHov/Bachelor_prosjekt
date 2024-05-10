import User from "../models/user.model.js";
import Profile from '../models/profile.model.js';


// Henter alle brukere
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password'); // Fjern passordfeltet fra responsen
        res.json(users);
    } catch (error) {
        next(error);
    }
};


// File: controllers/admin.controller.js

export const updateUserRole = async (req, res, next) => {
    const { userId, role } = req.body;

    if (!["user", "admin"].includes(role)) {
        return res.status(400).json({ message: "Invalid role specified" });
    }

    try {
        const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// File: controllers/admin.controller.js


export const getAllCollaborateProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({});
        res.json(profiles);
    } catch (error) {
        console.error("Failed to fetch collaborate profiles", error);
        res.status(500).json({ message: "Failed to fetch profiles" });
    }
};

export const deleteCollaborateProfile = async (req, res) => {
    const { profileId } = req.params;

    try {
        const deletedProfile = await Profile.findByIdAndDelete(profileId);
        if (!deletedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error("Error deleting profile", error);
        res.status(500).json({ message: "Failed to delete profile" });
    }
};

