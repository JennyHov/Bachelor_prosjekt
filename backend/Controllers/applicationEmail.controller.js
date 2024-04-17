import nodemailer from 'nodemailer';
import fs from 'fs';
import applicationEmailModel from '../models/applicationEmail.model.js';

export const submitApplicationEmail = async (req, res) => {
  const formData = req.body;
  const file = req.file;
  const fileBuffer = file ? file.buffer : null;

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
      attachments: file ? [{ filename: file.originalname, content: fileBuffer }] : [],
      html: `
        <h2 style="color: black;">New Application Submission</h1>
        <p><strong>Full Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Institution:</strong> ${formData.institution}</p>
        <p><strong>Project Name:</strong> ${formData.projectName}</p>
        <p><strong>Comments:</strong> ${formData.comments}</p>
        <p><strong>I have read the criteria for application through SEFiO:</strong> ${formData.criteriaCheck1 === 'true' ? 'Yes' : 'No'}</p>
        <p><strong>I have answered questions about sustainability, innovation and previous funding:</strong> ${formData.criteriaCheck2 === 'true' ? 'Yes' : 'No'}</p>
        <p><strong>I have received counseling from SEFiO or an institution:</strong> ${formData.criteriaCheck3 === 'true' ? 'Yes' : 'No'}</p>
        ${formData.file ? `<p><strong>File:</strong> ${formData.file.name} (${formData.file.size} bytes)</p>` : ''}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};
