const mockContactMethods = {
    save: jest.fn().mockResolvedValue({ message: 'Contact form submitted successfully' })
};

const Contact = jest.fn().mockImplementation(() => ({
    ...mockContactMethods
}));

export default Contact;


