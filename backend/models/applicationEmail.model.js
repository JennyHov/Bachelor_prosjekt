
const applicationEmailModel = {
    constructEmailMessage(formData) {
      let emailMessage = `
        Full Name: ${formData.fullName}
        Email: ${formData.email}
        Institution: ${formData.institution}
        Project Name: ${formData.projectName}
        Comments: ${formData.comments}
        I have read the criteria for application through SEFiO: ${formData.criteriaCheck1 ? 'Yes' : 'No'}
        I have answered questions about sustainability, innovation and previous funding: ${formData.criteriaCheck2 ? 'Yes' : 'No'}
        I have received counseling from SEFiO or an institution: ${formData.criteriaCheck3 ? 'Yes' : 'No'}
      `;

      if (formData.file) {
        emailMessage += `
        File: ${formData.file.name} (${formData.file.size} bytes)
      `;
      }
      
      return emailMessage;
    },
  };
  
  export default applicationEmailModel;