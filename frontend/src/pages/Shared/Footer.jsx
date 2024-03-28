import logoImage from '../../../../assets/images/footer/sefio_svart.png'; // Oppdater stien til din faktiske logo
import React from 'react';

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
                  <li><a href="/about">About</a></li>
                  <li><a href="/services">Services</a></li>
                  <li><a href="/careers">Careers</a></li>
                </ul>
              </div>

              {/* column 2 */}
              <div className="col-md-4">
                <h5>Contact</h5>
                <ul className="list-unstyled">
                  <li><a href="/who-are-we">Who are we?</a></li>
                  <li><a href="/faqs">FAQs</a></li>
                  <li><a href="/terms">Terms & Conditions</a></li>
                </ul>
              </div>

              {/* column 3 */}
              <div className="col-md-4">
                <h5>Discover</h5>
                <ul className="list-unstyled">
                  <li><a href="/events">Events</a></li>
                  <li><a href="/sponsors">Sponsors</a></li>
                  <li><a href="/partner-program">Partner Program</a></li>
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
