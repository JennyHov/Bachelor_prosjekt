import dotenv from 'dotenv';
dotenv.config(); 

import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const seedUsers = async () => {
    console.log('URI:', process.env.MONGO_URI);  //mongodb atlas sin url
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // denne sletter databasen, og legger inn to brukerne, en admin og en vanlig bruker.
        await User.deleteMany({});

        // lager samme passord for begge brukere
        const samePassword = "Abcd1234"; 
        // hashing av det felles passordet
        const hashedPassword = await bcrypt.hash(samePassword, 10);  

        // lager admin bruker
        const admin = new User({
            fullName: 'Admin bruker',
            email: 'admin@online.no',
            password: hashedPassword,  
            profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocKJ23INLoShdoukmRXkwDT7tqChL2DihzqYvTgx7Emi=s96-c',
            role: 'admin'
        });
        // lager vanlig bruker
        const user = new User({
            fullName: 'Vanlig bruker',
            email: 'bruker@online.no',
            password: hashedPassword,  
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
