import dotenv from 'dotenv';
dotenv.config(); // Sørger for at dette er det første som kjøres for å laste miljøvariabler

import mongoose from 'mongoose';
import User from '../models/user.model.js';  // Juster banen etter din struktur
import bcrypt from 'bcryptjs';

const seedUsers = async () => {
    console.log('URI:', process.env.MONGO_URI);  // Debugging: Skriv ut URI for å sjekke at den er lastet
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Slette eksisterende brukere (valgfritt, bruk med forsiktighet!)
        await User.deleteMany({});

        // Passord hashing
        const samePassword = "Abcd1234"; // Felles passord for begge brukerne
        const hashedPassword = await bcrypt.hash(samePassword, 10);  // Hashing av det felles passordet

        // Opprett admin og vanlig bruker
        const admin = new User({
            fullName: 'Admin bruker',
            email: 'admin@online.no',
            password: hashedPassword,  // Bruk det hashede passordet
            profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocKJ23INLoShdoukmRXkwDT7tqChL2DihzqYvTgx7Emi=s96-c',
            role: 'admin'
        });

        const user = new User({
            fullName: 'Vanlig bruker',
            email: 'bruker@online.no',
            password: hashedPassword,  // Bruk det hashede passordet
            profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocKJ23INLoShdoukmRXkwDT7tqChL2DihzqYvTgx7Emi=s96-c',
            role: 'user'
        });

        await admin.save();
        await user.save();
        console.log('Accounts for one admin and user have been made');
    } catch (error) {
        console.error('Failed to seed users:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedUsers();
