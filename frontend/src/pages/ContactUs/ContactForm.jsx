import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialSubmitForm, endSubmitForm, failSubmitForm, resetForm } from '../../Redux/formStates/formSlicer.js';
import { useNavigate } from 'react-router-dom';

import warningImage from '../../../../assets/images/error/warning.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/form.css';

const ContactForm = () => {
    const { currentUser, loading: userLoading, error: userError } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        fullName: currentUser ? currentUser.fullName : '',
        email: currentUser ? currentUser.email : '',
        subject: '',
        inquiry: ''
    });

    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [subjectError, setSubjectError] = useState('');
    const [inquiryError, setInquiryError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { loading, error } = useSelector((state) => state.form);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
          dispatch(resetForm());
        };
      }, [dispatch]);  

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

    const validateSubject = () => {
        if (!formData.subject.trim()) {
            setSubjectError('Subject is required');
            return false;
        }
        return true;
    };

    const validateInquiry = () => {
        if (!formData.inquiry.trim()) {
            setInquiryError('Inquiry is required');
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value // oppdatering basert på navnet
        });

        setErrorMessage('');

        if (name === 'fullName') {
            setFullNameError('');
        }
        if (name === 'email') {
            setEmailError('');
        }
        if (name === 'subject') {
            setSubjectError('');
        }
        if (name === 'inquiry') {
            setInquiryError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const isValidFullName = validateFullName();
        const isValidEmail = validateEmail();
        const isValidSubject = validateSubject();
        const isValidInquiry = validateInquiry();
    
        if (!isValidFullName || !isValidEmail || !isValidSubject || !isValidInquiry) {
            setErrorMessage('Please fill out all fields');
        } else {
            try {
                dispatch(initialSubmitForm());
    
                let response = await fetch('/api/contact-form/submit-contact-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to submit contact form');
                }
    
                response = await fetch('/api/contact-form-email/submit-contact-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to send contact form email');
                }
    
                dispatch(endSubmitForm());
                console.log('Contact form submitted successfully');
                navigate('/thankyou');
            } catch (error) {
                dispatch(failSubmitForm());
                console.error('Error submitting contact form:', error);
                setErrorMessage('Error submitting contact form:' + error.message);
            } 
        }
    };

      return (
        <form onSubmit={handleSubmit} action="https://api.web3forms.com/submit" method="POST">
            <fieldset className='form-container'>
                
                <div className='form-group form-box'>
                    <label htmlFor="fullName" className="form-label">Name<span className='star'>*</span></label>
                    <input 
                        id="fullName"
                        className="form-control form-input" 
                        type='text'
                        name="fullName" 
                        placeholder="First and last name" 
                        value={formData.fullName}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!fullNameError}
                    />
                    {fullNameError && <p className='form-input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{fullNameError}</p>}
                </div>

                <div className='form-group form-box'>
                    <label htmlFor="email" className="form-label">Your Email<span className='star'>*</span></label>
                    <input 
                        id="email"
                        type="email" 
                        className="form-control form-input" 
                        name="email" 
                        placeholder="Type in your email" 
                        value={formData.email}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!emailError}
                    />
                    {emailError && <p className='form-input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{emailError}</p>}                   
                </div>

                <div className='form-group form-box'>
                    <label htmlFor="subject" className="form-label">Subject<span className='star'>*</span></label>
                    <input 
                        id="subject"
                        type="text" 
                        className="form-control form-input" 
                        name="subject" 
                        placeholder="Subject for your inquiry" 
                        value={formData.subject}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!subjectError}
                    />
                    {subjectError && <p className='form-input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{subjectError}</p>}
                </div>

                <div className='form-group form-box'>
                    <label htmlFor="inquiry" className="form-label">Inquiry<span className='star'>*</span></label>
                    <textarea 
                        id="inquiry"
                        className="form-control form-input" 
                        name="inquiry" 
                        rows="3" 
                        placeholder="Tell us something"
                        value={formData.inquiry}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!inquiryError}
                    ></textarea>
                    {inquiryError && <p className='form-input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{inquiryError}</p>}
                </div>
            </fieldset>

            <div>
                {errorMessage && 
                    <div className="form-error-message"><img src={warningImage} alt="Warning icon" className='warning-image' />
                        {errorMessage}
                    </div>
                }
            </div>

            <div className="d-flex justify-content-center">
                <div className="form-button">
                    <button className="btn teritary-button" type="submit" disabled={loading} aria-busy={loading}>
                        {loading ? 'Loading...' : 'Submit Contact Form'}
                    </button>
                </div>
            </div>
        </form>
      );
}

export default ContactForm;