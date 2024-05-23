import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header>
      <nav>
        <div>
          <Link to='/'>
            <h1>Sefio kule navigasjonsbar</h1>
          </Link>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            {currentUser && currentUser.role === 'admin' && (
              <li>
                <Link to='/users'>Users</Link>
              </li>
            )}
            <li>
              <Link to='/user-profile'>
                {currentUser ? (
                  <img src={currentUser.profileImage} alt='profile' className='h-7 w-7 rounded-full object-cover' />
                ) : (
                  'Sign In'
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );  
}
