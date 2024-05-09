import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';
import '../css/SignUp.css';
import GoogleImage from '../../../assets/images/login/google.png';
import LoginPopup from './LoginPopup'; // Sørg for at stien er korrekt basert på filstrukturen din



export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false); 
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
      setFormData({ fullName: '', email: '', password: '' });
      setShowLoginPopup(true);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };


  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="signup-container">
      {showLoginPopup && (
        <LoginPopup isOpen={showLoginPopup} onClose={handleCloseLoginPopup} />
      )}
      <div className='signup-content'>
        <h1 className='sign-up-title'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='signup-form-container'>
          <input
            className='form-control signup-input'
            type='text'
            placeholder='Full Name'
            id='fullName'
            value={formData.fullName || ''}
            onChange={handleChange}
          />
          <input
            className='form-control signup-input'
            type='email'
            placeholder='Email'
            id='email'
            value={formData.email || ''}
            onChange={handleChange}
          />
          <input
            className='form-control signup-input'
            type='password'
            placeholder='Password'
            id='password'
            value={formData.password || ''}
            onChange={handleChange}
          />
          <div className='button-container'>
            <div>
              <button disabled={loading} className='sign-in-btn'>
              {loading ? 'Loading...' : 'Sign up'}
              </button>
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
          {error && 'Something went wrong!'}
      </div>
    </div>
  )
}
