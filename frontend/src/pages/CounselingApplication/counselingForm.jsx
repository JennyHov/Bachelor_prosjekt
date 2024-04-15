import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialSubmitForm, endSubmitForm, failSubmitForm, } from '../../Redux/formStates/formSlicer.js';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/pages.css';
import '../../css/form.css';

const SubmitCounselingForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        institution: '',
        projectName: '',
        comments: '',
        criteriaCheck1: false,
        criteriaCheck2: false,
    });

    const { loading, error } = useSelector((state) => state.form);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }; 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          dispatch(initialSubmitForm());
          const response = await fetch('/api/counseling-form/submit-counseling-form', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            dispatch(endSubmitForm());
            console.log('Application submitted successfully');
            navigate('/thankyou');
          } else {
            dispatch(failSubmitForm('Failed to submit application: ' + response.statusText));
            console.error('Failed to submit application:', response.statusText);
            // Handle error
          }
        } catch (error) {
          dispatch(failSubmitForm('Error submitting application: ' + error.message));
          console.error('Error submitting application:', error);
          // Handle error
        }
    };
      
    return (
        <form onSubmit={handleSubmit}>
          <div className="form-container">
              <div className="form-group form-box">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input 
                  className="form-control form-input"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="What is your name?"
                />
              </div>
              <div className="form-group form-box">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  className="form-control form-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="What is your email?"
                />
              </div>
              <div className="form-group form-box">
                <label htmlFor="institution" className="form-label">Institution</label>
                <input 
                  className="form-control form-input"
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="What institution do you attend?"
                />
              </div>
              <div className="form-group form-box">
                <label htmlFor="projectName" className="form-label">Name Of Project</label>
                <input 
                  className="form-control form-input"
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="Name of the project?"
                />
              </div>
              <div className="form-group form-box">
                <label htmlFor="comments" className="form-label">Do you have any comments?</label>
                <textarea 
                  className="form-control form-input"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Comments"
                ></textarea>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input"
                  type="checkbox"
                  name="criteriaCheck1"
                  checked={formData.criteriaCheck1}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="criteriaCheck1">I want guidance for submitting an application</label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input"
                  type="checkbox"
                  name="criteriaCheck2"
                  checked={formData.criteriaCheck2}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="criteriaCheck2">I want guidance regarding my project</label>
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
              <button className="btn teritary-button" disabled={loading}>
                {loading ? 'Loading...' : 'Submit Counseling Form'}
              </button>
            </div>
          </div>
          {error && <p>{error}</p>}
        </form>
    );
}

export default SubmitCounselingForm;