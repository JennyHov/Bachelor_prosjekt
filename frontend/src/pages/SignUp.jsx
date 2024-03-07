import { set } from 'mongoose';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          id='username'
          onChange={handleChange}
        />
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
          {loading ? 'Loading...' : 'Sign up'}
        </button>
      </form>
      <div>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span>Sign in</span>
        </Link>
      </div>
      <p>{error && 'Something went wrong!'}</p>
    </div>
  )
}
