// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Mongoose schema
const applicationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  institution: String,
  projectName: String,
  comments: String,
  criteriaCheck1: Boolean,
  criteriaCheck2: Boolean,
  criteriaCheck3: Boolean
});

const Application = mongoose.model('Application', applicationSchema);

// Middleware
app.use(express.json());

// Route to handle form submission
app.post('/submit-application', async (req, res) => {
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
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
