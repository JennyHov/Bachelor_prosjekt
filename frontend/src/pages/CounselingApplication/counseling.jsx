import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SubmitApplication() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 submit-application-container">
          <div className="title-container">
            <h1 className="submit-application-title">Apply for Counseling</h1>
          </div>
          <div className="message-container">
            <p className="submit-application-message">
                Our counseling application is designed to offer a convenient and effective plattform for connecting you with counselors who can provide guidance, support, and resources.
            </p>
            <p className="message-container">
                The inquiry will be handled by a SEFiO representative from your educational institution.
            </p>
          </div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="fullName" value="Jenny Hovland" readOnly />
              <small className="form-text text-muted">Autofill</small>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value="jenny.hovland@gmail.com" readOnly />
              <small className="form-text text-muted">Autofill</small>
            </div>
            <div className="form-group">
              <label htmlFor="institution" className="form-label">Institution</label>
              <input type="text" className="form-control" id="institution" placeholder="What institution do you attend?" />
            </div>
            <div className="form-group">
              <label htmlFor="projectName" className="form-label">Name Of Project</label>
              <input type="text" className="form-control" id="projectName" placeholder="Name of the project?" />
            </div>
            <div className="form-group">
              <label htmlFor="comments" className="form-label">Do you have any comments?</label>
              <textarea className="form-control" id="comments" rows="3" placeholder="Write your comment here"></textarea>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="criteriaCheck1" />
              <label className="form-check-label" htmlFor="criteriaCheck1">I want guidance for submitting an application</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="criteriaCheck2" />
              <label className="form-check-label" htmlFor="criteriaCheck2">I want guidance regarding my project</label>
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
