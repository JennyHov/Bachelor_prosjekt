import { initialSignIn, endSignIn, failSignIn } from '../Redux/userStates/usersSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth.jsx';

import CloseImage from '../../../assets/images/login/close.png';
import GoogleImage from '../../../assets/images/login/google.png';

const LoginPopup = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const dispatching = useDispatch();
    const navigate = useNavigate();
    const popupRef = useRef(null);

    useEffect(() => {
        // Function to handle clicks outside of the popup
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        // Add event listener when the popup is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup function
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        if (data.success === false) {
            dispatching(failSignIn(data));
            return;
        }
        dispatching(endSignIn(data));
        navigate('/');
        onclose();
        } catch (error) {
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
                        <div className='login-form-container'>
                            <div className='login-box'>
                                <input 
                                    className='login-input'
                                    type='email'
                                    placeholder='Email'
                                    id='email'
                                    onChange={handleChange}
                                /> 
                            </div>
                            <div className='login-box'>
                                <input 
                                    className='login-input'
                                    type='password'
                                    placeholder='Password'
                                    id='password'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='forgot-password-container'>
                                <p className='forgot-password text-secondary'>Forgot password?</p>
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
                    <p>{error ? error.message || 'Something went wrong!' : ''}</p>
                </div>
            </div>
            <div className='overlay'></div>
        </div>
    );
};

export default LoginPopup;