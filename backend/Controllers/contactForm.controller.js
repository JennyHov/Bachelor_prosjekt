import Contact from '../models/contactForm.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export const submitContactForm = async (req, res) => {
    try {

        if (req.error) {
            // send a response with the error message
            return res.status(400).json({ message: req.error.message });
          }

        console.log('req.body:', req.body);

        const {
            fullName,
            email,
            subject,
            inquiry
        } = req.body;

        const newContactForm = new Contact ({
            fullName,
            email,
            subject,
            inquiry
        });

        await newContactForm.save();

        res.status(201).json({ message: 'Contact form submitted successfully'});
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(({ message }) => message );
            return res.status(400).json({ errors });
        }
        console.error('Error submitting contact form:', error);
        res.status(500).json({ message: 'Server error' });
    }
};