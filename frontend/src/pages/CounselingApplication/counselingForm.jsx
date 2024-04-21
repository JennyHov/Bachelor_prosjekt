import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialSubmitForm, endSubmitForm, failSubmitForm, resetForm } from '../../Redux/formStates/formSlicer.js';
import { useNavigate } from 'react-router-dom';

import warningImage from '../../../../assets/images/error/warning.png';
import uploadImage from '../../../../assets/images/application/upload.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/pages.css';
import '../../css/form.css';

const SubmitCounselingForm = () => {
  const { currentUser, loading: userLoading, error: userError } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        fullName: currentUser ? currentUser.username : '',
        email: currentUser ? currentUser.email : '',
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
    const [checkboxError, setCheckboxError] = useState('');
    const [fileError, setFileError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState('Upload Application Draft');

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
    
    const validateCheckbox = () => {
      if (!formData.criteriaCheck1 && !formData.criteriaCheck2) {
        setCheckboxError('Please check at least one checkbox');
        return false;
      }
      setCheckboxError('');
      return true;
    };
  
    const validateFile = () => {
      if (formData.file && !['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/vnd.apple.pages'].includes(formData.file.type)) {
        setFileError('Invalid file type. Please upload a PDF, DOCX, DOC or PAGES file.');
        return false;
      }
      setFileError('');
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
      if (name === 'criteriaCheck1' || name === 'criteriaCheck2') {
        setCheckboxError('');
      }
    }; 
    
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      console.log('handleFileChange called with file:', file);
      setFormData((prevData) => ({
        ...prevData,
        file: file,
      }));
      setFileName(file.name);
      setFileError('');

      e.target.value = null;
    };

    const handleRemoveFile = (e) => {
      e.preventDefault();
      setFormData((prevData) => ({
        ...prevData,
        file: null,
      }));
      setFileName('Upload Application Draft');
    
      // Clear the file input's value
      document.getElementById('file').value = null;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidFullName = validateFullName();
    const isValidEmail = validateEmail();
    const isValidInstitution = validateInstitution();
    const isValidProjectName = validateProjectName();
    const isValidCheckbox = validateCheckbox();
    const isValidFile = validateFile();

    if (!isValidFullName || !isValidEmail || !isValidInstitution || !isValidProjectName || !isValidCheckbox || !isValidFile ) {
      setErrorMessage('Please fill out all required fields');
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

  const { loading, error } = useSelector((state) => state.form);

  useEffect(() => {
    console.log('Loading state:', loading);
  }, [loading]);
      
  return (
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-container">
            <div className="form-group form-box">
              <label htmlFor="fullName" className="form-label">Full Name<span className='star'>*</span></label>
              <input 
                className="form-control form-input"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="What is your name?"
              />
              {fullNameError && <p className='form-input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{fullNameError}</p>}
            </div>
            <div className="form-group form-box">
              <label htmlFor="email" className="form-label">Email<span className='star'>*</span></label>
              <input 
                className="form-control form-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="What is your email?"
              />
              {emailError && <p className='form-input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{emailError}</p>}
            </div>
            <div className="form-group form-box">
              <label htmlFor="institution" className="form-label">Institution<span className='star'>*</span></label>
              <input 
                className="form-control form-input"
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="What institution do you attend?"
              />
              {institutionError && <p className='form-input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{institutionError}</p>}
            </div>
            <div className="form-group form-box">
              <label htmlFor="projectName" className="form-label">Project Name<span className='star'>*</span></label>
              <input 
                className="form-control form-input"
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Name of the project?"
              />
              {projectNameError && <p className='form-input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{projectNameError}</p>}
            </div>
            <div className="form-group form-box">
              <label htmlFor="comments" className="form-label">Any comments?</label>
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
              {checkboxError && <p className='form-input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{checkboxError}</p>}
            </div>
            <div>
              <input 
                className='file-upload'
                id='file'
                type='file'
                name='file' 
                onChange={handleFileChange}
              />
                <button className="btn file-upload-button" onClick={() => document.getElementById('file').click()}><img src={uploadImage} alt="Upload icon" className='input-upload-image' />
                  {fileName}
                </button>
                {formData.file && <button className="btn" onClick={handleRemoveFile}>Remove</button>}
              {fileError && <p className='form-input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{fileError}</p>}
            </div>
        </div>
        <div>
          {errorMessage && 
            <div className="form-error-message"><img src={warningImage} alt="Warning icon" className='warning-image' />
              {errorMessage}
            </div>
          }
        </div>
        <div className="d-flex justify-content-center">
          <div className="form-button">
            <button className="btn teritary-button" disabled={loading}>
              {loading ? 'Loading...' : 'Submit Counseling Form'}
            </button>
          </div>
        </div>
      </form>
  );
}

export default SubmitCounselingForm;