import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialSubmitForm, endSubmitForm, failSubmitForm, } from '../../Redux/formStates/formSlicer.js';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/form.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        inquiry: ''
    });

    const { loading, error } = useSelector((state) => state.form);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        // Destructure the name and value from the event target
        const { name, value } = e.target;
        
        // Update the formData state using the spread operator to maintain previous state
        setFormData({
            ...formData,
            [name]: value // Update the specific field based on its name
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          dispatch(initialSubmitForm());
          const response = await fetch('/api/contact-form/submit-contact-form', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            dispatch(endSubmitForm());
            console.log('Contact form submitted successfully');
            navigate('/thankyou');
          } else {
            dispatch(failSubmitForm('Failed to submit contact form: ' + response.statusText));
            console.error('Failed to submit application:', response.statusText);
            // Handle error
          }
        } catch (error) {
          dispatch(failSubmitForm('Error submitting contact form: ' + error.message));
          console.error('Error submitting contact form:', error);
          // Handle error
        }
      };

      return (
        <form onSubmit={handleSubmit} action="https://api.web3forms.com/submit" method="POST">
            <div className='form-container'>
                <div className='form-group form-box'>
                    <input type="hidden" name="access_key" value="1a1c7959-8cd2-407b-82de-04a56a29837c"/>
                    <label htmlFor='sefioEmail' className='form-label'>Our Email</label>
                    <input
                        type='email'
                        className='form-control text-muted form-input'
                        name='sefioEmail'
                        value='kontakt@sefio.no'
                        readOnly
                    />
                </div>
                <div className='form-group form-box'>
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input 
                        type="email" 
                        className="form-control form-input" 
                        name="email" 
                        placeholder="Type in your email" 
                        value={formData.email}
                        onChange={handleChange}
                    />                   
                </div>
                <div className='form-group form-box'>
                    <label htmlFor="fullName" className="form-label">Name</label>
                    <input 
                        className="form-control form-input" 
                        type='text'
                        name="fullName" 
                        placeholder="Type in your first and last name" 
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group form-box'>
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input 
                        type="text" 
                        className="form-control form-input" 
                        name="subject" 
                        placeholder="Subject for your inquiry" 
                        value={formData.subject}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group form-box'>
                    <label htmlFor="inquiry" className="form-label">Comments</label>
                    <textarea 
                        className="form-control form-input" 
                        type='text'
                        name="inquiry" 
                        rows="3" 
                        placeholder="Write your text here"
                        value={formData.inquiry}
                        onChange={handleChange}
                    ></textarea>
                </div>
                {/*
                <div className='form-group form-box'>
                    <label htmlFor="upload" className="form-label">Upload application here</label>
                    <input type="file" className="form-control-file" name="upload" />
                    <small className="form-text text-muted">Click or drag a file to this area to upload</small>          
                </div>
                */}
            </div>
            <div className="d-flex justify-content-center">
                <div className="form-button">
                    <button className="btn teritary-button" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit Contact Form'}
                    </button>
                </div>
            </div>
            {error && <p>{error}</p>}
        </form>
    );
}

export default ContactForm;