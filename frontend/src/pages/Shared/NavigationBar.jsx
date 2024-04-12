import React, { useState } from 'react';
import logoImage from '../../../../assets/images/header/sefio.png';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/navbar.css';
import '../../css/loginPopup.css';
import LoginPopup from '../LoginPopup.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../Redux/userStates/usersSlicer.js';

const NavigationBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/');  // Adjust as necessary based on your routing setup
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-styling">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand ps-5 pe-2">
          <img src={logoImage} alt="SEFiO" height="35" />
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
            <Link to="/userprofile" className="nav-item nav-link">Profile</Link>
            <Link to="/counseling" className="nav-item nav-link">Counseling</Link>
            <Link to="/events" className="nav-item nav-link">Events</Link>
            <Link to="/collaborate" className="nav-item nav-link">Collaborate</Link>
            <Link to="/about-us" className="nav-item nav-link">About Us</Link>
            <Link to="/criteria" className="nav-item nav-link">Criteria</Link>
            <Link to="/contact-us" className="nav-item nav-link">Contact Us</Link>
          </div>

          <div className="navbar-nav ms-auto d-flex align-items-center px-5">
            {currentUser ? (
              <>
                <Link to="/userprofile" className="nav-item nav-link">My Profile</Link>
                <button className="nav-item btn login-button" onClick={handleSignOut}>Log Out</button>
              </>
            ) : (
              <>
                <button className="nav-item btn login-button" onClick={togglePopup}>Log In</button>
                <LoginPopup isOpen={isPopupOpen} onClose={togglePopup} /> {isPopupOpen && <div className='overlay'></div>}
              </>
            )}
            <Link to="/submit-application" className="nav-item btn application-button">Submit application</Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
