import { submitContactEmail } from '../Controllers/contactEmail.controller';
import contactEmailModel from '../models/contactEmail.model';
import nodemailer from 'nodemailer';

// mocking nodemailer and contactEmailModel
jest.mock('nodemailer');
jest.mock('../models/contactEmail.model');

describe('ContactEmail Controller', () => {
  let mockSendMail;
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mockSendMail = jest.fn();
    nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });
  });

  it('should send a contact email with the correct data', async () => {
    const req = {
      body: {
        fullName: 'Erling Braut Haaland',
        email: 'ErlingBrautHaaland@online.no',
        subject: 'Test Subject',
        inquiry: 'Test Inquiry'
      }
    };
    const res = mockResponse();
    contactEmailModel.constructEmailMessage.mockReturnValue('Constructed email message');

    await submitContactEmail(req, res);

    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.any(Object));
    expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
      from: 'jenny.hovland@gmail.com',
      to: 'jenny.hovland@live.no',
      subject: 'New Contact Form Submission',
      text: 'Constructed email message',
      html: expect.stringContaining('Erling Braut Haaland')
    }));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Contact form submitted successfully' });
  });

  it('should handle errors during email sending', async () => {
    const req = {
      body: {
        fullName: 'Jo Nesbo',
        email: 'JoNesbo@online.no',
        subject: 'Test Subject',
        inquiry: 'Test Inquiry'
      }
    };
    const res = mockResponse();
    const error = new Error('Failed to send email');
    mockSendMail.mockRejectedValue(error);

    await submitContactEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to submit contact form' });
  });
});
