import nodemailer from 'nodemailer';
import applicationEmailModel from '../models/applicationEmail.model.js';

export const submitApplicationEmail = async (req, res) => {
  const formData = req.body;
  const file = req.file;

  const emailMessage = applicationEmailModel.constructEmailMessage(formData);

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
      subject: 'New Application Submission',
      text: emailMessage,
      // Attach the file if it exists
      file: file ? [{ filename: file.originalname, content: file.buffer }] : [],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};
