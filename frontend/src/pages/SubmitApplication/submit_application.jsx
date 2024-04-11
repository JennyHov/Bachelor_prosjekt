import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import { myFunction } from '../../read_more.js';
import '../../css/submit_application.css';
import '../../css/form.css';


import DownArrowImage from '../../../../assets/images/application/arrow-down-sign-to-navigate.png';

export default function SubmitApplication() {

  useEffect(() => {
    myFunction();
  }, []); 

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="container page-container">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 submit-application-container">
          <div className="title-container">
            <h1 className="page-title submit-application-title">Submit Application</h1>
          </div>
          <div className="read-more-container">
            <div className="read-criteria submit-application-message">
              Read our criteria before applying<span id='dots'></span>
                <button onClick={myFunction} id='myBtn' className='arrow-button'>Read More
                </button>
              <span id='more'>
                <div className="read-more-message additional-content">
                  <div className="message">
                    SEFiO offers free counseling to all applicants, at any stage in the process. We recommend requesting this as soon as possible.
                      <div className="d-flex flex-column justify-content-center align-items-start gap-3">
                        <Link to="/counseling" className="text-primary">Apply for counseling</Link>
                      </div>
                  </div>
                  <div className="message">
                    Below you will find our application forms used to evaluate your project/business. Feel free to download and start your application. Remember that our great advisory team is ready to help elevate your application. Projects utilizing counseling before submitting usually reach higher in the evaluation.
                      <div className="d-flex gap-3">
                        <a role='link' onClick={() => openInNewTab("https://docs.google.com/document/d/1bwx2Jk3mT1_1m4EuPOQZmkWAVHkqoI0cw3u2iY9IWo4/edit")} className='text-secondary'>English</a>                            
                        <a role='link' onClick={() => openInNewTab("https://docs.google.com/document/d/1XH7RPoE6wd3AJ8ydJxMuYLVUPb9uIGNuAizkaYoSAJ0/edit")} className='text-secondary'>Norwegian</a> 
                      </div>
                  </div>
                  <div className="message">After each deadline, all applications are processed within two (2) weeks. During those two weeks, the counseling team will contact you. One (1) week later the projects/businesses that are to present before the jury are chosen and invited to the final. You will then have one (1) week to prepare for the jury.</div>
                  <div className="message">If you did not make it this round, you will be offered counseling and the chance to apply in the next round.</div>
                </div>
              </span>
            </div>  
          </div>
          <div className="form-container">
            <div className="form-group form-box">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" className="form-control form-input" id="fullName" placeholder='What is your name?'/>
            </div>
            <div className="form-group form-box">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control form-input" id="email" placeholder='What is your email?'/>
            </div>
            <div className="form-group form-box">
              <label htmlFor="institution" className="form-label">Institution</label>
              <input type="text" className="form-control form-input" id="institution" placeholder="What institution do you attend?" />
            </div>
            <div className="form-group form-box">
              <label htmlFor="projectName" className="form-label">Name Of Project</label>
              <input type="text" className="form-control form-input" id="projectName" placeholder="What is the name of the project?" />
            </div>
            <div className="form-group form-box">
              <label htmlFor="comments" className="form-label">Do you have any comments?</label>
              <textarea className="form-control form-input" id="comments" rows="3" placeholder="Write your comment here"></textarea>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="criteriaCheck1" />
              <label className="form-check-label" htmlFor="criteriaCheck1">I have read the criteria for application through SEFiO</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="criteriaCheck2" />
              <label className="form-check-label" htmlFor="criteriaCheck2">I have answered questions about sustainability, innovation and previous funding</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="criteriaCheck3" />
              <label className="form-check-label" htmlFor="criteriaCheck3">I have received counseling from SEFiO or an institution</label>
            </div>
            <div className="form-group">
              <label htmlFor="upload" className="form-label">Upload application here</label>
              <input type="file" className="form-control-file" id="upload" />
              <small className="form-text text-muted">Click or drag a file to this area to upload</small>
            </div>
          </div>
          <div className="button-container">
            <Link to="/thankyou" className="btn btn-primary">Submit application</Link>
          </div>
        </div>
      </div>
    </div>
  );
}