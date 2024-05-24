// models/profile.model.js

import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    institution: { type: String, required: true, enum: ['BI', 'Oslomet', 'UiO', 'NTNU', 'Other'] },
    category: { type: String, required: true, enum: ['Academic', 'Industry'] },
    role: { type: String, required: true, enum: ['Student', 'Group'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profileImageUrl: { type: String } 
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
