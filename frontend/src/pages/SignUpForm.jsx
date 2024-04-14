import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';

import '../css/loginPopup.css';
import '../css/error-message.css';

import LoginPopup from './SignUpPopup.jsx';
import LoginForm from './LoginForm.jsx';

import CloseImage from '../../../assets/images/login/close.png';
import GoogleImage from '../../../assets/images/login/google.png';
import warningImage from '../../../assets/images/error/warning.png';

const SignUpForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      onClose(); // Close the sign-up popup
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div>
      <div className='login-content'>
        <button onClick={onClose}><img src={CloseImage} alt="Close icon" className='close-icon'/></button>
        <div className="login-container">
            <h1 className='sign-in-title'>Register here</h1>
            <form onSubmit={handleSubmit}>
                <div className='login-form-container'>
                    <div className='form-group login-box'>
                        <input
                            className='form-control login-input'
                            type='text'
                            placeholder='Username'
                            id='username'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="login-form-container">
                    <div className="form-group login-box">
                        <input
                            className='form-control login-input'
                            type='email'
                            placeholder='Email'
                            id='email'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="login-form-container">
                    <div className="form-group login-box">
                        <input
                            className='form-control login-input'
                            type='password'
                            placeholder='Password'
                            id='password'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="button-container">
                    <div type='button' className='sign-in-container'>
                        <button disabled={loading} className='sign-in-btn' onClick={onSubmit}>
                            {loading ? 'Loading...' : 'Register'}
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
    </div>
  );
};

export default SignUpForm;
