import { initialSignIn, endSignIn, failSignIn } from '../Redux/userStates/usersSlicer';
import { login, setToken } from '../Redux/userStates/authSlicer';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth.jsx';

import '../css/loginPopup.css';
import '../css/error-message.css';

import CloseImage from '../../../assets/images/login/close.png';
import GoogleImage from '../../../assets/images/login/google.png';
import warningImage from '../../../assets/images/error/warning.png';

const LoginForm = ({ toggleForm, onClose }) => {
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [formError, setFormError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { loading, error } = useSelector((state) => state.user);
    const dispatching = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setEmailError('');
        setPasswordError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        let emailIsValid = true;
        let passwordIsValid = true;

        if (!formData.email) {
            setEmailError('Please input your email address');
            emailIsValid = false;
        }
    
        if (!formData.password) {
            setPasswordError('Please input your password');
            passwordIsValid = false;
        }
    
        //  hvis epost eller passord ikke er rett
        if (!emailIsValid || !passwordIsValid) {
            return;
        }

        try {
            dispatching(initialSignIn());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log('Response data: ', data); 
            if (!data._id) {
                dispatching(failSignIn(data));
                return;
            }

            const token = res.headers.get('Authorization');            
            dispatching(login(token));
            dispatching(endSignIn(data));
            navigate('/');
            onClose();
        } catch (error) {
            console.error('Error occurred: ', error);
            dispatching(failSignIn(error));
        }
        
    };

    return (
        <form onSubmit={handleSubmit}>
          <section className='error-container' aria-live="polite">
            {formError && (
              <p className='error-message'>
                <img src={warningImage} alt="Warning icon" className='warning-image' />
                {formError}
              </p>
            )}
          </section>
          <fieldset className='login-form-container'>
            <legend className='visually-hidden'>Login Form</legend>
            <div className='form-group login-box'>
              <label htmlFor='email' className='visually-hidden'>Email</label>
              <input
                className='form-control login-input'
                type='email'
                placeholder='Email'
                id='email'
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? 'email-error' : null}
              />
              {emailError && (
                <p id='email-error' className='input-error-message'>
                  <img src={warningImage} alt="Warning icon" className='input-warning-image' />
                  {emailError}
                </p>
              )}
            </div>
            <div className='form-group login-box'>
              <label htmlFor='password' className='visually-hidden'>Password</label>
              <input
                className='form-control login-input'
                type='password'
                placeholder='Password'
                id='password'
                value={formData.password}
                onChange={handleChange}
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? 'password-error' : null}
              />
              {passwordError && (
                <p id='password-error' className='input-error-message'>
                  <img src={warningImage} alt="Warning icon" className='input-warning-image' />
                  {passwordError}
                </p>
              )}
            </div>
          </fieldset>
      
          <section className='button-container'>
            <div className='sign-in-container'>
              <button type='submit' disabled={loading} className='sign-in-btn'>
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
            <div className='no-account-container'>
              <p className='no-account'>
                Don't have an account?&nbsp;
                <button type="button" onClick={toggleForm} className='text-primary'>
                  Sign up here
                </button>
              </p>
            </div>
            <div className='divider'>
              <span className='divider-line'></span>
              <span className='divider-text'>Or</span>
              <span className='divider-line'></span>
            </div>
            <div className='google-login-btn'>
              <img src={GoogleImage} alt="Google logo" className='google-logo' />
              <Oauth />
            </div>
          </section>
        </form>
    );      
};

export default LoginForm;