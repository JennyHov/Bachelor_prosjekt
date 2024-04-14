import Application from '../models/form.model.js';

export const submitApplication = async (req, res) => {
    try {
        const {
            fullName,
            email,
            institution,
            projectName,
            comments,
            criteriaCheck1,
            criteriaCheck2,
            criteriaCheck3
        } = req.body;

        const newApplication = new Application({
            fullName,
            email,
            institution,
            projectName,
            comments,
            criteriaCheck1,
            criteriaCheck2,
            criteriaCheck3
        });

        await newApplication.save();
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        // Check if the error is a validation error
        if (error.name === 'ValidationError') {
            // Extract error messages from the validation error
            const errors = Object.values(error.errors).map(({ message }) => message);
            // Return the validation error messages
            return res.status(400).json({ errors });
        }

        // Handle other types of errors
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Server error' });
    }
};