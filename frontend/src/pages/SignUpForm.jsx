import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';

import '../css/loginPopup.css';
import '../css/error-message.css';

import CloseImage from '../../../assets/images/login/close.png';
import GoogleImage from '../../../assets/images/login/google.png';
import warningImage from '../../../assets/images/error/warning.png';

const SignUpForm = ({ onClose, toggleForm }) => {
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
      toggleForm();
      onClose(); // Close the sign-up popup
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className='login-form-container'>
            <div className='form-group login-box'>
                <input
                    className='form-control signup-input'
                    type='text'
                    placeholder='Full Name'
                    id='fullName'
                    value={formData.fullName || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group login-box">
                <input
                    className='form-control signup-input'
                    type='email'
                    placeholder='Email'
                    id='email'
                    value={formData.email || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group login-box">
                <input
                    className='form-control signup-input'
                    type='password'
                    placeholder='Password'
                    id='password'
                    value={formData.password || ''}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className='button-container'>
            <div type="button" className='sign-in-container'>
              <button disabled={loading} className='sign-in-btn'>
                {loading ? 'Loading...' : 'Sign up'}
              </button>
            </div>
            <div className='no-account-container'>
                <p className='no-account'>Already have an account?&nbsp;
                    <button onClick={toggleForm} className='text-primary'>
                        Login here
                    </button>
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
  );
};

export default SignUpForm;
