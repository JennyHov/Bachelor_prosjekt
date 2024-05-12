import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/footer.css';

import logoImage from '../../../../assets/images/footer/sefio.png'; // Oppdater stien til din faktiske logo
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
        <div className="row d-flex justify-content-center align-items-center sponsors-representatives">
          <div className="row d-flex justify-content-center align-items-center sponsors mb-4">
              <div className="col-sm-4 d-flex justify-content-end align-items-center">
                <img src={aneoImage} alt="aneo" className="sponsor-logo"/>
              </div>
              <div className="col-sm-4 d-flex justify-content-center align-items-center">
                <img src={sefiogulImage} alt="sefioGul" className="sefio-yellow-logo"/>
              </div>
              <div className="col-sm-4 d-flex justify-content-start align-items-center">
                <img src={osloImage} alt="oslo" className="sponsor-logo"/>
              </div>
          </div>
          <div className="row justify-content-center align-items-center representatives">
            <div className="col-sm-2 d-flex justify-content-center align-items-center">
              <img src={hkImage} alt="hk" className="representative-logo"/>
            </div>
            <div className="col-sm-2 d-flex justify-content-center align-items-center">
              <img src={biImage} alt="bi" className="representative-logo"/>
            </div>
            <div className="col-sm-2 d-flex justify-content-center align-items-center">
              <img src={oslometImage} alt="oslomet" className="representative-logo"/>
            </div>
            <div className="col-sm-2 d-flex justify-content-center align-items-center">
              <img src={uioImage} alt="uio" className="representative-logo"/>
            </div>
            <div className="col-sm-2 d-flex justify-content-center align-items-center">
              <img src={nmbuImage} alt="nmbu" className="representative-logo"/>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center footer-bar">
          <div className="row justify-content-center align-items-center footer-info mb-1">
            <div className='col-sm-4 d-flex justify-content-end align-items-center'>
              <p>kontakt@sefio.no</p>
            </div>
            <div className='col-sm-4 d-flex justify-content-center align-items-center'>
              <p>+4799363714</p>
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
