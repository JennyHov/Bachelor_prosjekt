import express from 'express';
import multer from 'multer'; // Import multer
import { submitApplication } from '../Controllers/applicationForm.controller.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/application/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });

  const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 5000 * 1024, // limit file size to 5000kb
    },
    fileFilter: function (req, file, cb) {
      // only allow certain filetypes
      if (
        file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        file.mimetype === 'application/vnd.apple.pages' || 
        file.mimetype === 'application/msword'
    ) { 
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only PDF, DOCX, DOC, and PAGES files are allowed.'));
      }
    }
  });

  router.post('/submit-application', upload.single('file'), (err, req, res, next) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      // File too large
      return res.status(413).json({ message: 'File too large. Maximum size is 5000KB.' });
    } else if (err) {
      // Other Multer error
      return res.status(400).json({ message: err.message });
    }
    // No error, continue to the next middleware function
    next();
  }, submitApplication);

export default router;