import Counseling from "../models/counselingForm.model.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export const submitCounselingForm = async (req, res) => {
    try {

        if (req.error) {
            // send a response with the error message
            return res.status(400).json({ message: req.error.message });
        }
        
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);        
  
        const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

        const {
            fullName,
            email,
            institution,
            projectName,
            comments,
            criteriaCheck1,
            criteriaCheck2
        } = req.body;

        const fileId = new mongoose.Types.ObjectId();

        const uploadStream = gfs.openUploadStreamWithId(fileId, req.file.originalname, {
            contentType: req.file.mimetype,
            metadata: {
            }
        });

        await Promise.all([
            new Promise((resolve, reject) => {
                const readStream = fs.createReadStream(req.file.path);
                readStream.pipe(uploadStream).on('finish', resolve).on('error', reject);
            }),
        ]);

        const newCounselingForm = new Counseling ({
            fullName,
            email,
            institution,
            projectName,
            comments,
            criteriaCheck1,
            criteriaCheck2,
            file: {
                fileId,
                filename: req.file.originalname,
                contentType: req.file.mimetype,
                size: req.file.size / 1024
            }
        });

        await newCounselingForm.save();

        res.status(201).json({ message: 'Counseling form submitted successfully' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(({ message }) => message);
            return res.status(400).json({ errors });
        }
        console.error('Error submitting counseling form:', error);
        res.status(500).json({ message: 'Server error' });
    }
};