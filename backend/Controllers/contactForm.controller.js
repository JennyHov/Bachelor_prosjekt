import Contact from '../models/contactForm.model.js';

export const submitContactForm = async (req, res) => {
    try {
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
            const errors = Objects.values(error.errors).map(({ message }) => message );
            return res.status(400).json({ errors });
        }
        console.error('Error submitting contact form:', error);
        res.status(500).json({ message: 'Server error' });
    }
};