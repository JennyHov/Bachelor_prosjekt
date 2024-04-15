import Counseling from "../models/counselingForm.model.js";

export const submitCounselingForm = async (req, res) => {
    try {
        const {
            fullName,
            email,
            institution,
            projectName,
            comments,
            criteriaCheck1,
            criteriaCheck2
        } = req.body;

        const newCounselingForm = new Counseling ({
            fullName,
            email,
            institution,
            projectName,
            comments,
            criteriaCheck1,
            criteriaCheck2
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