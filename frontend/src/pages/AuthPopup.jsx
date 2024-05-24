import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm.jsx';
import LoginForm from './LoginForm.jsx';
import Oauth from '../components/Oauth.jsx';

import '../css/loginPopup.css';
import '../css/error-message.css';

import CloseImage from '../../../assets/images/login/close.png';
import GoogleImage from '../../../assets/images/login/google.png';
import warningImage from '../../../assets/images/error/warning.png';

const AuthPopup = ({ isOpen, onClose }) => {
    const [isSignUpOpen, setSignUpOpen] = useState(false);
    const { loading, error } = useSelector((state) => state.user);
    const popupRef = useRef(null);

    const toggleSignUp = () => {
      setSignUpOpen(!isSignUpOpen);
    };

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

    return (
        <div className={`login-popup ${isOpen ? 'open' : ''}`} ref={popupRef} role="dialog" aria-modal="true" aria-labelledby="login-dialog-title">
          <div className='login-content'>
            <button onClick={onClose} aria-label="Close login form"><img src={CloseImage} alt="Close icon" className='close-icon'/></button>
            <div className='login-container'>
              <h1 id="login-dialog-title" className='sign-in-title'>Welcome back!</h1>
              {isSignUpOpen ? (
                <SignUpForm toggleForm={toggleSignUp} onSubmit={onClose} />
              ) : (
                <LoginForm toggleForm={toggleSignUp} onSubmit={onClose} />
              )}
            </div>
          </div>
          <div className='overlay'></div>
        </div>
      );      
};
    
export default AuthPopup;
