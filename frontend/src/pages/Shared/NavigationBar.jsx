import React, { useState, useEffect } from 'react';
import logoImage from '../../../../assets/images/header/sefio.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'

import '../../css/navbar.css';
import '../../css/loginPopup.css';
import AuthPopup from '../AuthPopup.jsx';
import { signOut } from '../../Redux/userStates/usersSlicer.js';
import Countdown from './Countdown.jsx';

const NavigationBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isSticky, setSticky] = useState(false);
  const [navbarTop, setNavbarTop] = useState(0);
  const [navbarPos, setNavbarPos] = useState("absolute");
  const supportPageOffset = window.pageYOffset !== undefined;
  const [visible, setVisible] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = lastScrollPos > currentScrollPos || currentScrollPos === 0;
      setShouldShow(isScrollingUp);
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPos]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleSignOut = async () => {
    try {
        // Making a GET request to the logout endpoint
        const response = await fetch('/api/auth/signOut', {
            method: 'GET', // this is a get method according to backend
            credentials: 'include' // taking with us the cookie, so it is gone
        });
        if (response.ok) {
            dispatch(signOut());
            navigate('/'); // redirect to homepage
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
};

  const navStyle = {
    position: 'fixed',
    top: shouldShow ? '0' : '-70px',  // Replace 80 with your navbar's height
    transition: 'top 0.3s',
    // other styles...
  };

  return (
    <div className='d-flex justify-content-center'>
        <nav className="navbar navbar-expand-lg navbar-styling" style={navStyle}>
        <div className="container-fluid">
            <Link to="/" className="navbar-brand ps-5 pe-2">
              <img src={logoImage} alt="Svart logo for SEFiO, Studentenes Entreprenørskapsfond i Oslo" className='sefio-logo-navbar'/>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={toggleCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNavAltMarkup">
              <div className="navbar-nav align-items-center">
                <NavLink to="/counseling" className="nav-item nav-link underline" id='counselingLink' activeclassName="active">Counseling</NavLink>
                <NavLink to="/events" className="nav-item nav-link underline" id='eventsLink' activeclassName="active">Events</NavLink>
                <NavLink to="/collaborate" className="nav-item nav-link underline" id='collaborateLink' activeclassName="active">Collaborate</NavLink>
                <NavLink to="/about-us" className="nav-item nav-link underline" id='aboutLink' activeclassName="active">About Us</NavLink>
                <NavLink to="/process" className="nav-item nav-link underline" id='processLink' activeclassName="active">Process</NavLink>
                <NavLink to="/contact-us" className="nav-item nav-link underline" id='contactLink' activeclassName="active">Contact Us</NavLink>
                {currentUser && currentUser.role === 'admin' && (
                  <NavLink to="/dashboard" className="nav-item nav-link underline" activeclassName="active">Dashboard</NavLink>
                )}
              </div>

              <div className="navbar-nav ms-auto d-flex align-items-center px-5">
                {currentUser ? (
                  <>
                    <NavLink to="/userprofile" className="nav-item nav-link underline" id='profileLink' activeclassName="active">My Profile</NavLink>
                    <button className="nav-item btn logout-button" onClick={handleSignOut}>Log Out</button>
                  </>
                ) : (
                  <>
                    <button className="nav-item btn login-button" onClick={togglePopup}>Log In</button>
                    <AuthPopup isOpen={isPopupOpen} onClose={togglePopup} /> {isPopupOpen && <div className='overlay'></div>}
                  </>
                )}
                <Link to="/submit-application" className="btn btn-primary secondary-button">Apply for Funding</Link>
              </div>
            </div>
        </div>
      </nav>
      <Countdown />
    </div>
    
  );
};

export default NavigationBar;
