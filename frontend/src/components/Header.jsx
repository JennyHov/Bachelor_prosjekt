import { Link } from 'react-router-dom'

export default function Header() {
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
                <Link to='/sign-in'>
                <li>Sign In</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}
