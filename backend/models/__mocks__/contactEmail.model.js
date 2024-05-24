const contactEmailModel = {
    constructEmailMessage: jest.fn(formData => {
        return `
        Full Name: ${formData.fullName}
        Email: ${formData.email}
        Subject: ${formData.subject}
        Inquiry: ${formData.inquiry}
      `;
    })
};

export default contactEmailModel;
