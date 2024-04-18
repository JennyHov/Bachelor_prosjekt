// models/profile.model.js

import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    institution: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['Academic', 'Industry'] },
    role: { type: String, required: true, enum: ['Student', 'Group'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
