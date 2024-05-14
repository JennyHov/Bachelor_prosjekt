import { submitCounselingEmail } from '../Controllers/counselingEmail.controller';
import counselingEmailModel from '../models/counselingEmail.model';
import nodemailer from 'nodemailer';

// Mocking external dependencies
jest.mock('../models/counselingEmail.model');
jest.mock('nodemailer');

describe('CounselingEmail Controller', () => {
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

    afterEach(() => {
        jest.restoreAllMocks();  
    });

    it('this will send a counseling email with the correct data', async () => {
        const req = {
            body: {
                fullName: 'Jonas Gahr Store',
                email: 'JonasLive@gmail.no',
                institution: 'Sciences Po',
                projectName: 'Industri satsing',
                comments: 'Treparts samarbeid',
                criteriaCheck1: 'true',
                criteriaCheck2: 'false',
                file: {
                    name: 'rapport.pdf',
                    size: 1024
                }
            },
            file: {
                originalname: 'resume.pdf',
                buffer: Buffer.from('Dette er en test fil')
            }
        };
        const res = mockResponse();

        counselingEmailModel.constructEmailMessage.mockReturnValue('Constructed email message');

        await submitCounselingEmail(req, res);

        expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.any(Object));
        expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
            from: 'jenny.hovland@gmail.com',
            to: 'jenny.hovland@live.no',
            subject: 'New Counseling Submission',
            text: 'Constructed email message',
            attachments: [{ filename: 'resume.pdf', content: Buffer.from('Dette er en test fil') }],
            html: expect.stringContaining('John Doe')
        }));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Counseling form submitted successfully' });
    });

    it('this should try to handle errors during email sending', async () => {
        const req = {
            body: {
                fullName: 'Gunnhild Sundli',
                email: 'Gunnhild Sundli@hotmail.no'
            }
        };
        const res = mockResponse();
        const error = new Error('Failed to send email');
        mockSendMail.mockRejectedValue(error);

        await submitCounselingEmail(req, res);

        expect(console.error).toHaveBeenCalledWith('Error submitting counseling form:', error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to submit counseling form' });
    });
});
