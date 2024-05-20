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


const LoginPopup = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [formError, setFormError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { loading, error } = useSelector((state) => state.user);
    const dispatching = useDispatch();
    const navigate = useNavigate();
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

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
    
        // If either email or password is not valid, stop here and do not submit form
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
        <div className={`login-popup ${isOpen ? 'open' : ''}`} ref={popupRef}>
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
                        </div>
                        <div className='button-container'>
                            <div type='button' className='sign-in-container'>
                                <button disabled={loading} className='sign-in-btn'>
                                    {loading ? 'Loading...' : 'Login'}
                                </button>  
                            </div>
                            <div className='no-account-container'>
                                <p className='no-account'>Don't have an account? {' '}
                                    <Link to='/sign-up' className='text-primary'>
                                        Sign up here
                                    </Link>
                                </p>
                            </div>
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
            <div className='overlay'></div>
        </div>
    );
};

export default LoginPopup;