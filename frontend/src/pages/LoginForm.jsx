import { initialSignIn, endSignIn, failSignIn } from '../Redux/userStates/usersSlicer';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth.jsx';

import '../css/loginPopup.css';
import '../css/error-message.css';

import LoginPopup from './SignUpPopup.jsx';
import SignUpForm from './SignUpForm.jsx';

import CloseImage from '../../../assets/images/login/close.png';
import GoogleImage from '../../../assets/images/login/google.png';
import warningImage from '../../../assets/images/error/warning.png';

const LoginForm = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [formError, setFormError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { loading, error } = useSelector((state) => state.user);
    const dispatching = useDispatch();
    const navigate = useNavigate();
    const popupRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setFormError('');
        setEmailError('');
        setPasswordError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        if (!formData.email && !formData.password) {
            setFormError('Please input both an email and a password.');
        } else if (!formData.email) {
            setEmailError('Please input an email address');
        } else if (!formData.password) {
            setPasswordError('Please input your password');
        } else {
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
                if (!data.success) {
                    dispatching(failSignIn(data));
                    return;
                }
                dispatching(endSignIn(data));
                navigate('/');
                onClose();
            } catch (error) {
                dispatching(failSignIn(error));
            }
        }
    };

    return (
        <div className='login-content'>
            <button onClick={onClose}><img src={CloseImage} alt="Close icon" className='close-icon'/></button>
            <div className='login-container'>
                <h1 className='sign-in-title'>Welcome back!</h1>        
                <form onSubmit={handleSubmit}>
                    <div className='error-container'>
                        {formError && <p className='error-message'><img src={warningImage} alt="Warning icon" className='warning-image' />{formError}</p>}
                    </div>
                    <div className='login-form-container'>
                        <div className='form-group login-box'>
                            <input 
                                className='form-control login-input'
                                type='email'
                                placeholder='Email'
                                id='email'
                                value={formData.email}
                                onChange={handleChange}
                            /> 
                            {emailError && <p className='input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{emailError}</p>}
                        </div>
                        <div className='form-group login-box'>
                            <input 
                                className='form-control login-input'
                                type='password'
                                placeholder='Password'
                                id='password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {passwordError && <p className='input-error-message'><img src={warningImage} alt="Warning icon" className='input-warning-image' />{passwordError}</p>}
                        </div>
                        <div className='forgot-password-container'>
                            <p className='forgot-password text-primary'>Forgot password?</p>
                        </div>
                    </div>
                    <div className='button-container'>
                        <div type='button' className='sign-in-container'>
                            <button disabled={loading} className='sign-in-btn' onClick={onSubmit}>
                                {loading ? 'Loading...' : 'Login'}
                            </button>  
                        </div>
                        <LoginPopup />
                        <div className='divider'>
                            <span className='divider-line'></span>
                            <span className='divider-text'>Or</span>
                            <span className='divider-line'></span>
                        </div>
                        <div className='google-login-btn' type='button'>
                            <img src={GoogleImage} alt="Google logo" className='google-logo'/>
                            <Oauth />
                        </div>
                    </div>      
                </form>
            </div>
        </div>
    );
};

export default LoginForm;