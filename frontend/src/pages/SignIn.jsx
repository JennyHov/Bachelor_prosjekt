
import { initialSignIn, endSignIn, failSignIn } from '../Redux/userStates/usersSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth.jsx';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatching = useDispatch();
  const navigate = useNavigate();
  
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
    } catch (error) {
      dispatching(failSignIn(error));
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          onChange={handleChange}
        />
        <button disabled={loading}>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <Oauth />
      </form>
      <div>
        <p>Don&#39;t have an account?</p>
        <Link to='/sign-up'>
          <span>Sign up</span>
        </Link>
      </div>
      <p>{error ? error.message || 'Something went wrong!' : ''}</p>
    </div>
  )
}
