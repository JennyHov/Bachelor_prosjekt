import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';

import '../css/loginPopup.css';
import '../css/error-message.css';

import CloseImage from '../../../assets/images/login/close.png';
import GoogleImage from '../../../assets/images/login/google.png';
import warningImage from '../../../assets/images/error/warning.png';

const SignUpForm = ({ onClose, toggleForm }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});  // Declare the errors state here
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();


  const validateInput = () => {
    let newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.length > 50) {
      newErrors.fullName = 'Full name must not exceed 50 characters.';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (formData.email.length > 100) {
      newErrors.email = 'Email must not exceed 100 characters.';
    }

    if (formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one numeral.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  }



  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateInput();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
        setError(data.message);
        setErrors({ form: data.message }); // Display the specific error message from the server
        return;
      }
      toggleForm();
      onClose(); // Close the sign-up popup
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError('There was a problem with your signup. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className='login-form-container'>
        {errors.form && <div className='error-message'>{errors.form}</div>}
            <div className='form-group login-box'>
                <input
                    className={`form-control signup-input ${errors.fullName ? 'is-invalid' : ''}`}
                    type='text'
                    placeholder='Full Name'
                    id='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                />
                {errors.fullName && <div className='error-message'>{errors.fullName}</div>}
            </div>
            <div className="form-group login-box">
                <input
                    className={`form-control signup-input ${errors.email ? 'is-invalid' : ''}`}
                    type='email'
                    placeholder='Email'
                    id='email'
                    value={formData.email || ''}
                    onChange={handleChange}
                />
                {errors.email && <div className='error-message'>{errors.email}</div>}
            </div>
            <div className="form-group login-box">
                <input
                    className={`form-control signup-input ${errors.password ? 'is-invalid' : ''}`}
                    type='password'
                    placeholder='Password'
                    id='password'
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <div className='error-message'>{errors.password}</div>}
            </div>
            <div className="form-group login-box">
              <input
                className={`form-control signup-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                type='password'
                placeholder='Confirm Password'
                id='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            {errors.confirmPassword && <div className='error-message'>{errors.confirmPassword}</div>}
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
