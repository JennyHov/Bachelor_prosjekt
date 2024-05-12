const applicationEmailModel = {
    constructEmailMessage: jest.fn(formData => {
      return `
        Full Name: ${formData.fullName}
        Email: ${formData.email}
        Institution: ${formData.institution}
        Project Name: ${formData.projectName}
        Comments: ${formData.comments}
        Criteria Check 1: ${formData.criteriaCheck1 === 'true' ? 'Yes' : 'No'}
        Criteria Check 2: ${formData.criteriaCheck2 === 'true' ? 'Yes' : 'No'}
        Criteria Check 3: ${formData.criteriaCheck3 === 'true' ? 'Yes' : 'No'}
      `;
    })
  };
  
  export default applicationEmailModel;
  