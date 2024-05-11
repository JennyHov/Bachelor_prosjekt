
import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import applicationFormRoutes from './routes/applicationForm.route.js';
import contactFormRoutes from './routes/contactForm.route.js';
import counselingFormRoutes from './routes/counselingForm.route.js';
import applicationEmailRoutes from './routes/applicationEmail.route.js';
import counselingEmailRoutes from './routes/counselingEmail.route.js';
import contactEmailRoutes from './routes/contactEmail.route.js';
import profileRoutes from './routes/profile.route.js';
import adminRoutes from './routes/admin.route.js';
import countdownRoutes from './routes/countdown.routes.js'



dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();

let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "filesBucket",
    });
    if (bucket) {
      console.log("Bucket is ready to use");
    }
  });
})();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

//Routes
app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/countdown', countdownRoutes);




app.use('/api/application-form', applicationFormRoutes);
app.use('/api/contact-form', contactFormRoutes);
app.use('/api/counseling-form', counselingFormRoutes);
app.use('/api/application-email', applicationEmailRoutes);
app.use('/api/counseling-form-email', counselingEmailRoutes);
app.use('/api/contact-form-email', contactEmailRoutes);

//Error handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
      console.log('Server is running on port 3000');
  });
}
export default app;
