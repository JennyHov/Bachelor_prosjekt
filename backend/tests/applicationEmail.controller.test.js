import { submitApplicationEmail } from '../Controllers/applicationEmail.controller';
import nodemailer from 'nodemailer';
import applicationEmailModel from '../models/applicationEmail.model';

// mocking nodemailer and applicationEmailModel
jest.mock('nodemailer');
jest.mock('../models/applicationEmail.model');

describe('ApplicationEmail Controller', () => {
  let mockSendMail;
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error output
    mockSendMail = jest.fn();
    nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });
});


  it('should send an email with the correct data', async () => {
    const req = {
      body: {
        fullName: 'John Doe',
        email: 'john@example.com',
        institution: 'University X',
        projectName: 'Project Y',
        comments: 'Some comments here',
        criteriaCheck1: 'true',
        criteriaCheck2: 'true',
        criteriaCheck3: 'true',
        file: {
          name: 'resume.pdf',
          size: 15000
        }
      },
      file: {
        originalname: 'resume.pdf',
        buffer: Buffer.from('This is a test file')
      }
    };
    const res = mockResponse();
    applicationEmailModel.constructEmailMessage.mockReturnValue('Constructed email message');

    await submitApplicationEmail(req, res);

    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.any(Object));
    expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
      from: 'jenny.hovland@gmail.com',
      to: 'jenny.hovland@live.no',
      subject: 'New Application Submission',
      text: 'Constructed email message',
      attachments: [
        { filename: 'resume.pdf', content: Buffer.from('This is a test file') }
      ],
      html: expect.stringContaining('John Doe')
    }));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Application submitted successfully' });
  });

  it('should handle errors during email sending', async () => {
    const req = {
      body: {
        fullName: 'John Doe',
        email: 'john@example.com',
        institution: 'University X',
        projectName: 'Project Y',
        comments: 'Some comments here',
        criteriaCheck1: 'true',
        criteriaCheck2: 'true',
        criteriaCheck3: 'true',
        file: {
          name: 'resume.pdf',
          size: 15000
        }
      },
      file: {
        originalname: 'resume.pdf',
        buffer: Buffer.from('This is a test file')
      }
    };
    const res = mockResponse();
    const error = new Error('Failed to send email');
    mockSendMail.mockRejectedValue(error);

    await submitApplicationEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to submit application' });
  });
});
