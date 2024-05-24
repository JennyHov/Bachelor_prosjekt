import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/footer.css';

import logoImage from '../../../../assets/images/footer/sefio.png'; // blir den brukt eller ikke?
import sefiogulImage from '../../../../assets/images/footer/sefio_gul.png';
import aneoImage from '../../../../assets/images/footer/aneo.png';
import osloImage from '../../../../assets/images/footer/oslo.png';
import biImage from '../../../../assets/images/footer/bi.png';
import hkImage from '../../../../assets/images/footer/HK_rod_rgb.png';
import nmbuImage from '../../../../assets/images/footer/nmbu.png';
import oslometImage from '../../../../assets/images/footer/oslomet-logo-gul.png';
import uioImage from '../../../../assets/images/footer/uio.png';

const Footer = () => {
  return (
    <footer className="footer footer-expand-lg">
      <div className="container-fluid row d-flex justify-content-center align-items-center">
        <section className="row d-flex justify-content-center align-items-center sponsors-representatives">
          <div className="row d-flex justify-content-center align-items-center sponsors mb-4">
            <div className="col-sm-4 d-flex justify-content-end align-items-center">
              <img src={aneoImage} alt="Aneo logo" className="sponsor-logo" />
            </div>
            <div className="col-sm-4 d-flex justify-content-center align-items-center">
              <img src={sefiogulImage} alt="SEFiO Yellow logo" className="sefio-yellow-logo" />
            </div>
            <div className="col-sm-4 d-flex justify-content-start align-items-center">
              <img src={osloImage} alt="Oslo logo" className="sponsor-logo" />
            </div>
          </div>
          <div className="row justify-content-center align-items-center representatives">
            <div className="col-sm-2 d-flex justify-content-center align-items-center">
              <img src={hkImage} alt="Høyskolen Kristiania logo" className="representative-logo" />
            </div>
            <div className="col-sm-2 d-flex justify-content-center align-items-center">
              <img src={biImage} alt="BI logo" className="representative-logo" />
            </div>
            <div className="col-sm-2 d-flex justify-content-center align-items-center">
              <img src={oslometImage} alt="OsloMet logo" className="representative-logo" />
            </div>
            <div className="col-sm-2 d-flex justify-content-center align-items-center">
              <img src={uioImage} alt="UiO logo" className="representative-logo" />
            </div>
            <div className="col-sm-2 d-flex justify-content-center align-items-center">
              <img src={nmbuImage} alt="NMBU logo" className="representative-logo" />
            </div>
          </div>
        </section>
        <div className="row d-flex justify-content-center align-items-center footer-bar">
          <div className="row justify-content-center align-items-center footer-info mb-1">
            <address className='col-sm-4 d-flex justify-content-end align-items-center'>
              <p>Email: <a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
            </address>
            <div className='col-sm-4 d-flex justify-content-center align-items-center'>
              <p>Phone: <a href="tel:+4799363714">+47 993 63 714</a></p>
            </div>
            <div className='col-sm-4 d-flex justify-content-start align-items-center'>
              <p>Orgnr: 930 908 177</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );  
};

export default Footer;
