import logoImage from '../../../../assets/images/footer/sefio_svart.png'; // Oppdater stien til din faktiske logo
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light py-3">
      <div className="container">
        <div className="row">
          {/* Venstre seksjon med logo og kontaktinformasjon */}
          <div className="col-md-4">
            <img src={logoImage} alt="SEFiO" className="footer-logo mb-2" height="60"/>
            <p>kontakt@sefio.no</p>
            <p>+4799363714</p>
            <p>Orgnr: 930 908 177</p>
          </div>

          {/* Right section with columns*/}
          <div className="col-md-8">
            <div className="row">
              {/* colummn 1 */}
              <div className="col-md-4">
                <h5>Company</h5>
                <ul className="list-unstyled">
                  <Link to="/about-us" className="nav-item nav-link">About Us</Link>
                  <Link to="/events" className="nav-item nav-link">Events</Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
