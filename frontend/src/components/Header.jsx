import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
        <div>
            <Link to='/'>
            <h1>Sefio kule navigasjonsbar</h1>            
            </Link>
            <ul>
                <Link to='/'>
                <li>Home</li>
                </Link>
                <Link to='/about'>
                <li>About</li>
                </Link>
                
                {currentUser && currentUser.role === 'admin' && (
                  <Link to='/users'>
                    <li>Users</li>
                  </Link>
                )}

                <Link to='/user-profile'>
                  {currentUser ? (
                <img src={currentUser.profileImage} alt='profile' className='h-7 w-7 rounded-full object-cover' />
              ) : (
                <li>Sign In</li>
              )}
                </Link>
            </ul>
        </div>
    </div>
  )
}
