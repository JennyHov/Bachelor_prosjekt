import { useEffect, useState } from 'react';
import SignUpForm from './SignUpForm.jsx';
import LoginForm from './LoginForm.jsx';

import '../css/loginPopup.css';
import '../css/error-message.css';

const LoginPopup = ({ isOpen, onClose }) => {
    const [isSignUpOpen, setSignUpOpen] = useState(false);
  
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
        <div className={`login-popup ${isOpen ? 'open' : ''}`}>
            <div className='login-content'>
                {isSignUpOpen ? (
                    <SignUpForm onSubmit={onClose} />
                ) : (
                    <LoginForm onSubmit={onClose} />
                )}
                <button onClick={toggleSignUp}>
                    {isSignUpOpen ? 'Back to Login' : 'Sign Up Here'}
                </button>
            </div>
            <div className='overlay'></div>
        </div>
    );
};
    
export default LoginPopup;
