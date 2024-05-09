import User from "../models/user.model.js";

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

