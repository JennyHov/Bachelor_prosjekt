import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SubmitApplicationForm from './SubmitApplicationForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../css/submit_application.css';
import '../../css/form.css';

import DownArrowImage from '../../../../assets/images/application/arrow-down-sign-to-navigate.png';
import UpArrowImage from '../../../../assets/images/application/arrow-up-sign-to-navigate.png';

export default function SubmitApplication() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const isMoreOpenStored = localStorage.getItem('isMoreOpen');
    setIsMoreOpen(isMoreOpenStored === 'true');
  }, []); 

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const toggleMore = () => {
    setIsMoreOpen(!isMoreOpen);
    localStorage.setItem('isMoreOpen', !isMoreOpen);
  };

  return (
    <div className="container page-container">
      <div style={{ height: '70px' }} />
      <section className="row justify-content-center align-items-center">
        <div className="col-lg-6 submit-application-container">
          <header className="title-container">
            <h1 className="page-title submit-application-title">Submit Application</h1>
          </header>
          <div className="read-more-container">
            <p className="page-message submit-application-message">
              Read about our process before applying<span id='moreText'></span>
              <button onClick={toggleMore} id='myBtn' className='arrow-button' aria-expanded={isMoreOpen}>
                <img src={isMoreOpen ? UpArrowImage : DownArrowImage} alt={isMoreOpen ? "Read Less" : "Read More"} />
              </button>
            </p>
            <div id='more' style={{ display: isMoreOpen ? 'block' : 'none' }} className="read-more-message additional-content">
              <div className="message">
                <p>1. SEFiO offers free counseling to all applicants, at any stage in the process. We recommend requesting this as soon as possible.</p>
                <div className="d-flex flex-column justify-content-center align-items-start gap-3">
                  <Link to="/counseling" className="text-primary">Apply for counseling</Link>
                </div>
              </div>
              <div className="message">
                <p>2. Below you will find our application forms used to evaluate your project/business. Feel free to download and start your application. Remember that our great advisory team is ready to help elevate your application. Projects utilizing counseling before submitting usually reach higher in the evaluation.</p>
                <div className="d-flex gap-3">
                  <a role='button' onClick={() => openInNewTab("https://docs.google.com/document/d/1bwx2Jk3mT1_1m4EuPOQZmkWAVHkqoI0cw3u2iY9IWo4/edit")} className='text-primary'>English</a>                            
                  <a role='button' onClick={() => openInNewTab("https://docs.google.com/document/d/1XH7RPoE6wd3AJ8ydJxMuYLVUPb9uIGNuAizkaYoSAJ0/edit")} className='text-primary'>Norwegian</a> 
                </div>
              </div>
              <div className="message">
                <p>3. After each deadline, all applications are processed within two (2) weeks. During those two weeks, the counseling team will contact you. One (1) week later the projects/businesses that are to present before the jury are chosen and invited to the final. You will then have one (1) week to prepare for the jury.</p>
              </div>
              <div className="message">
                <p>4. If you did not make it this round, you will be offered counseling and the chance to apply in the next round.</p>
              </div>
            </div>
          </div>
          <SubmitApplicationForm />
        </div>
      </section>
    </div>
  );
  
}