import nodemailer from 'nodemailer';
import contactEmailModel from '../models/contactEmail.model.js';

export const submitContactEmail = async (req, res) => {
    const formData = req.body;

    const emailMessage = contactEmailModel.constructEmailMessage(formData);

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jenny.hovland@gmail.com',
                pass: 'vywc wiaj sihl udwv',
              },
        });

        const mailOptions = {
            from: 'jenny.hovland@gmail.com',
            to: 'jenny.hovland@live.no',
            subject: 'New Contact Form Submission',
            text: emailMessage,
            html: `
                <h2 style="color: black;">New Contact Form Submission</h1>
                <p><strong>Full Name:</strong> ${formData.fullName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Subject:</strong> ${formData.subject}</p>
                <p><strong>Inquiry:</strong> ${formData.inquiry}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'Failed to submit contact form' });
    }
};