// C:\Users\freda\Bachelor_prosjekt\backend\tests\contactForm.controller.test.js
import { submitContactForm } from '../Controllers/contactForm.controller';
import Contact from '../models/contactForm.model';

// mocking av kontakt formen
jest.mock('../models/contactForm.model');

describe('ContactForm Controller', () => {
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        // rengjører hver mock test
        jest.clearAllMocks(); 
    });

    it('should handle server errors for Erna Solberg', async () => {
        const req = {
            body: {
                fullName: 'Erna Solberg',
                email: 'ErnaErStjerna@online.no',
                subject: 'Forespørsel om samarbeid',
                inquiry: 'Jeg ønsker å diskutere skattelovgivning som kan fremme bærekraftig utvikling i Norge.'
            }
        };
        const res = mockResponse();
        const error = new Error('Server error');
        Contact.mockImplementation(() => {
            return {
                save: jest.fn().mockRejectedValue(error)
            };
        });
        // fjernet error meldinger  her
        jest.spyOn(console, 'error').mockImplementation(() => {}); 

        await submitContactForm(req, res);

        expect(console.error).toHaveBeenCalledWith('Error submitting contact form:', error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
    });

    it('should handle server errors', async () => {
        const req = {
            body: {
                fullName: 'Petter Stordalen',
                email: 'PetterStordalen@online.no',
                subject: 'Forespørsel om samarbeid',
                inquiry: 'Jeg er interessert i å utforske mulighetene for et strategisk samarbeid mellom våre firmaer. Ser frem til en mulig dialog for å diskutere hvordan vi sammen kan oppnå felles mål og suksess.'
            }
        };
        const res = mockResponse();
        const error = new Error('Server error');
        Contact.mockImplementation(() => {
            return {
                save: jest.fn().mockRejectedValue(error)
            };
        });

        jest.spyOn(console, 'error').mockImplementation(() => {}); 

        await submitContactForm(req, res);

        expect(console.error).toHaveBeenCalledWith('Error submitting contact form:', error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
    });

    it('should handle server errors for Erna Solberg', async () => {
        const req = {
            body: {
                fullName: 'Erna Solberg',
                email: 'erna.solberg@stortinget.no',
                subject: 'Forespørsel om samtale med deres bedrift',
                inquiry: 'Jeg ønsker å diskutere nye initiativer for næringslivet for å fremme bærekraftig utvikling i Norge.'
            }
        };
        const res = mockResponse();
        const error = new Error('Server error');
        Contact.mockImplementation(() => {
            return {
                save: jest.fn().mockRejectedValue(error)
            };
        });
        // fjerna error melding her
        jest.spyOn(console, 'error').mockImplementation(() => {}); 

        await submitContactForm(req, res);

        expect(console.error).toHaveBeenCalledWith('Error submitting contact form:', error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
    });

    
});
