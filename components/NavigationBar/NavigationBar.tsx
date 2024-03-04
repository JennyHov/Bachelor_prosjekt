import logoImage from '../../assets/images/header/sefio.png'; // Pass på at denne stien er korrekt

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="navbar-brand" href="/">
            <img src={logoImage} alt="SEFiO" height="30" />
            </a>
            <a className="nav-item nav-link" href="/home">Home</a>
            <a className="nav-item nav-link" href="/counseling">Counseling</a>
            <a className="nav-item nav-link" href="/events">Events</a>
            <a className="nav-item nav-link" href="/collaborate">Collaborate</a>
            <a className="nav-item nav-link" href="/about-us">About Us</a>
            <a className="nav-item nav-link" href="/criteria">Criteria</a>
          </div>
        </div>
        <div className="navbar-nav ms-auto">
          <button className="nav-item btn btn-outline-success" type="button">Log In</button>
          <button className="nav-item btn btn-success" style={{ marginLeft: "10px" }} type="button">SUBMIT APPLICATION</button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
