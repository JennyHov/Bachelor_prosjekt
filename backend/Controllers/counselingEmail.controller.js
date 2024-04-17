import nodemailer from 'nodemailer';
import counselingEmailModel from '../models/counselingEmail.model.js';

export const submitCounselingEmail = async ( req, res ) => {
    const formData = req.body;
    const file = req.file;
    const fileBuffer = file ? file.buffer : null;

    const emailMessage = counselingEmailModel.constructEmailMessage(formData);

    try {
        const transporter = nodemailer.createTransport({
          // Configure your SMTP settings here
          service: 'gmail',
          auth: {
            user: 'jenny.hovland@gmail.com',
            pass: 'vywc wiaj sihl udwv',
          },
        });

        const mailOptions = {
            from: 'jenny.hovland@gmail.com',
            to: 'jenny.hovland@live.no',
            subject: 'New Counseling Submission',
            text: emailMessage,
            // Attach the file if it exists
            attachments: file ? [{ filename: file.originalname, content: fileBuffer }] : [],
            html: `
                <h2 style="color: black;">New Counseling Submission</h1>
                <p><strong>Full Name:</strong> ${formData.fullName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Institution:</strong> ${formData.institution}</p>
                <p><strong>Project Name:</strong> ${formData.projectName}</p>
                <p><strong>Comments:</strong> ${formData.comments}</p>
                <p><strong>I want guidance for submitting an application:</strong> ${formData.criteriaCheck1 === 'true' ? 'Yes' : 'No'}</p>
                <p><strong>I want guidance regarding my project:</strong> ${formData.criteriaCheck2 === 'true' ? 'Yes' : 'No'}</p>
                ${formData.file ? `<p><strong>File:</strong> ${formData.file.name} (${formData.file.size} bytes)</p>` : ''}
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Counseling form submitted successfully' });
    } catch (error) {
        console.error('Error submitting counseling form:', error);
        res.status(500).json({ error: 'Failed to submit counseling form' });
    }
};