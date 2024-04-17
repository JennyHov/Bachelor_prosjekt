import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialSubmitForm, endSubmitForm, failSubmitForm, resetForm } from '../../Redux/formStates/formSlicer.js';
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

    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [institutionError, setInstitutionError] = useState('');
    const [projectNameError, setProjectNameError] = useState('');
    const [commentsError, setCommentsError] = useState('');
    const [fileError, setFileError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { loading, error } = useSelector((state) => state.form);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      // This function is called when the component unmounts
      return () => {
        // Dispatch an action to reset the form state
        dispatch(resetForm());
      };
    }, [dispatch]); // dispatch is a dependency
  
    const validateFullName = () => {
      if (!formData.fullName.trim()) {
        setFullNameError('Full Name is required');
        return false;
      }
      return true;
    };
    
    const validateEmail = () => {
      if (!formData.email.trim()) {
        setEmailError('Email is required');
        return false;
      }
      return true;
    };
    
    const validateInstitution = () => {
      if (!formData.institution.trim()) {
        setInstitutionError('Institution is required');
        return false;
      }
      return true;
    };
    
    const validateProjectName = () => {
      if (!formData.projectName.trim()) {
        setProjectNameError('Project name is required');
        return false;
      }
      return true;
    };
    
    const validateComments = () => {
      if (!formData.comments.trim()) {
        setCommentsError('An inquiry is required');
        return false;
      }
      return true;
    };
  
    const validateFile = () => {
      if (!formData.file) {
        setFileError('Please upload a file (PDF, docx, doc or pages).');
        return false;
      }
      return true;
    };

    const handleChange = (e) => {
      const { name, value, checked, type } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
      }));

      setErrorMessage('');

      if (name === 'fullName') {
        setFullNameError('');
      }
      if (name === 'email') {
        setEmailError('');
      }
      if (name === 'institution') {
        setInstitutionError('');
      }
      if (name === 'projectName') {
        setProjectNameError('');
      }
      if (name === 'comments') {
        setCommentsError('');
      }
    }; 
    
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      console.log('handleFileChange called with file:', file);
      setFormData((prevData) => ({
        ...prevData,
        file: file,
      }));
      setFileError('');
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidFullName = validateFullName();
    const isValidEmail = validateEmail();
    const isValidInstitution = validateInstitution();
    const isValidProjectName = validateProjectName();
    const isValidComments = validateComments();
    const isValidFile = validateFile();

    if (!isValidFullName || !isValidEmail || !isValidInstitution || !isValidProjectName || !isValidComments || !isValidFile ) {
      setErrorMessage('Please fill out all fields.');
    } else {
      try {
        dispatch(initialSubmitForm());
        
        const formDataToSend1 = new FormData();
        
        // Append form data fields
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== 'file') {
            formDataToSend1.append(key, value);
          }
        });
        
        // Append file data if it exists
        if (formData.file) {
          console.log('Appending file to formDataToSend1:', formData.file);
          formDataToSend1.append('file', formData.file);
          for (var pair of formDataToSend1.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
          }
        }
      
        // Send form data to your backend endpoint
        let formResponse = await fetch('/api/counseling-form/submit-counseling-form', {
          method: 'POST',
          body: formDataToSend1, // Send the FormData object directly
        });
        
        // Check if form submission was successful
        if (!formResponse.ok) {
          throw new Error('Failed to submit counseling form');
        }
      
        const formDataToSend2 = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key != 'file') {
            formDataToSend2.append(key, value);
          }
        });
        if (formData.file) {
          formDataToSend2.append('file', formData.file);
        }
        
        // If form submission was successful, send the email
        const emailResponse = await fetch('/api/counseling-form-email/submit-counseling-email', {
          method: 'POST',
          headers: {
            // Add any necessary headers here
          },
          body: formDataToSend2, // Send the same FormData object
        });
      
        // Check if email sending was successful
        if (!emailResponse.ok) {
          throw new Error('Failed to send email');
        }
      
        dispatch(endSubmitForm());
        console.log('Counseling form and email submitted successfully');
        navigate('/thankyou');
      } catch (error) {
        dispatch(failSubmitForm());
        setErrorMessage('Error submitting counseling form: ' + error.message);
        console.error('Error submitting counseling form:', error);
      }
    };
  };   

  useEffect(() => {
    console.log('Loading state:', loading);
  }, [loading]);
      
  return (
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              {fullNameError && <p className='input-error-message'>{fullNameError}</p>}
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
              {emailError && <p className='input-error-message'>{emailError}</p>}
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
              {institutionError && <p className='input-error-message'>{institutionError}</p>}
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
              {projectNameError && <p className='input-error-message'>{projectNameError}</p>}
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
              {commentsError && <p className='input-error-message'>{commentsError}</p>}
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
            <div>
              <input 
                type='file'
                name='file' 
                onChange={handleFileChange}
              />
              {fileError && <p className='input-error-message'>{fileError}</p>}
            </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="form-button">
            <button className="btn teritary-button" disabled={loading}>
              {loading ? 'Loading...' : 'Submit Counseling Form'}
            </button>
          </div>
        </div>
        {errorMessage && 
          <div className="error-message">
            {errorMessage}
          </div>
        }
      </form>
  );
}

export default SubmitCounselingForm;