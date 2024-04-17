const counselingEmailModel = {
    constructEmailMessage(formData) {
        let emailMessage = `
        Full Name: ${formData.fullName}
        Email: ${formData.email}
        Institution: ${formData.institution}
        Project Name: ${formData.projectName}
        Comments: ${formData.comments}
        I want guidance for submitting an application: ${formData.criteriaCheck1 === 'true' ? 'Yes' : 'No'}
        I want guidance regarding my project: ${formData.criteriaCheck2 === 'true' ? 'Yes' : 'No'}
        `;

        if (formData.file) {
            emailMessage += `
            File: ${formData.file.name} (${formData.file.size} bytes)
        `;
        }
        
        return emailMessage;
        },
};

export default counselingEmailModel;
