import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input
          type='text'
          placeholder='Username'
          id='username'
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
        />
        <button>
          Sign up
        </button>
      </form>
      <div>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
