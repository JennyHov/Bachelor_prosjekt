import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/pages.css';

export default function SubmitApplication() {
  return (
    <div className="container page-container">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-8 submit-application-container">
          <div className="title-container">
            <h1 className="page-title submit-application-title">Apply for Counseling</h1>
          </div>
        </div>
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 submit-application-container">    
          <div className="message-container">
            <p className="page-message submit-application-message">
                Our counseling application is designed to offer a convenient and effective plattform for connecting you with counselors who can provide guidance, support, and resources.
                The inquiry will be handled by a SEFiO representative from your educational institution.
            </p>
          </div>
          <div className="form-container">
            <div className="form-group form-box">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" className="form-control form-input" id="fullName" placeholder='What is your name?' />
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
              <input type="text" className="form-control form-input" id="projectName" placeholder="Name of the project?" />
            </div>
            <div className="form-group form-box">
              <label htmlFor="comments" className="form-label">Do you have any comments?</label>
              <textarea className="form-control form-input" id="comments" rows="3" placeholder="Write your comment here"></textarea>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="criteriaCheck1" />
              <label className="form-check-label" htmlFor="criteriaCheck1">I want guidance for submitting an application</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="criteriaCheck2" />
              <label className="form-check-label" htmlFor="criteriaCheck2">I want guidance regarding my project</label>
            </div>
            {/*
            <div className="form-group">
              <label htmlFor="upload" className="form-label">Upload application here</label>
              <input type="file" className="form-control-file" id="upload" />
              <small className="form-text text-muted">Click or drag a file to this area to upload</small>
            </div>
            */}
          </div>
          <div className="d-flex justify-content-center">
            <div className="form-button">
              <Link to="/thankyou" className="btn teritary-button">Submit</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
