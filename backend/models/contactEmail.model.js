const contactEmailModel = {
    constructEmailMessage(formData) {
        let emailMessage = `
        Full Name: ${formData.fullName}
        Email: ${formData.email}
        Subject: ${formData.subject}
        Inquiry: ${formData.inquiry}
      `;

      return emailMessage;
    },
};

export default contactEmailModel;