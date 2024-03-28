import logoImage from '../../../../assets/images/header/sefio.png';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();

  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (location.pathname === '/home' && targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    } else {
      window.location.href = `#${targetId}`;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/home" className="navbar-brand">
              <img src={logoImage} alt="SEFiO" height="30" />
            </Link>
            <Link to="/userprofile" className="nav-item nav-link">Profile</Link>
            <Link to="/counseling" className="nav-item nav-link">Counseling</Link>
            <Link to="/events" className="nav-item nav-link">Events</Link>
            <Link to="/collaborate" className="nav-item nav-link">Collaborate</Link>
            <Link to="/about-us" className="nav-item nav-link" onClick={(e) => handleSmoothScroll(e, 'about-us-section')}>About Us</Link>
            <Link to="/criteria" className="nav-item nav-link">Criteria</Link>
          </div>
        </div>
        <div className="navbar-nav ms-auto">
          <button className="nav-item btn btn-outline-success" type="button">Log In</button>
          <Link to="/submit-application" className="nav-item btn btn-success" style={{ marginLeft: "10px" }}>SUBMIT APPLICATION</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
