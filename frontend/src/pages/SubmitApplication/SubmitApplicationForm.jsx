import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/submit_application.css';
import '../../css/form.css';

function SubmitApplicationForm() {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    projectName: '',
    comments: '',
    criteriaCheck1: false,
    criteriaCheck2: false,
    criteriaCheck3: false
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Application submitted successfully');
        // Redirect or show success message
      } else {
        console.error('Failed to submit application:', response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle error
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <div className="form-container">
            <div className="form-group form-box">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" className="form-control form-input" id="fullName" placeholder='What is your name?'/>
            </div>
            <div className="form-group form-box">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control form-input" id="email" placeholder='What is your email?'/>
            </div>
            <div className="form-group form-box">
              <label htmlFor="institution" className="form-label">Institution</label>
              <input type="text" className="form-control form-input" id="institution" placeholder="What institution do you attend?" />
            </div>
            <div className="form-group form-box">
              <label htmlFor="projectName" className="form-label">Name Of Project</label>
              <input type="text" className="form-control form-input" id="projectName" placeholder="What is the name of the project?" />
            </div>
            <div className="form-group form-box">
              <label htmlFor="comments" className="form-label">Do you have any comments?</label>
              <textarea className="form-control form-input" id="comments" rows="3" placeholder="Write your comment here"></textarea>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="criteriaCheck1" />
              <label className="form-check-label" htmlFor="criteriaCheck1">I have read the criteria for application through SEFiO</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="criteriaCheck2" />
              <label className="form-check-label" htmlFor="criteriaCheck2">I have answered questions about sustainability, innovation and previous funding</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="criteriaCheck3" />
              <label className="form-check-label" htmlFor="criteriaCheck3">I have received counseling from SEFiO or an institution</label>
            </div>
            {/* 
            <div className="form-group">
              <label htmlFor="upload" className="form-label">Upload application here</label>
              <input type="file" className="form-control-file" id="upload" />
              <small className="form-text text-muted">Click or drag a file to this area to upload</small>
            </div>
            */}
        </div>
        <div className="d-flex justify-content-center">
            <div className="form-button">
              <Link to="/thankyou" className="btn teritary-button" type='submit'>Submit Application</Link>
            </div>
        </div>
      </form>
  );
}


export default SubmitApplicationForm;
