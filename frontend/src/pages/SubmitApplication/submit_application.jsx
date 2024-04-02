import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { myFunction } from '../../read_more.js';
import '../../css/submit_application.css';

export default function SubmitApplication() {

  useEffect(() => {
    myFunction();
  }, []); 

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 submit-application-container">
          <div className="title-container">
            <h1 className="submit-application-title">Submit Application</h1>
          </div>
          <div className="message-container">
            <p className="submit-application-message">Read our criteria before applying<span id='dots'>...</span></p>
              <span id='more'>
                <div className="additional-content">
                <div className="w-100 h-100 pt-5 d-flex flex-column justify-content-center align-items-center gap-5">
                  <div className="h-120 d-flex flex-column justify-content-center align-items-center gap-3">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center gap-3">
                        <div className="d-flex justify-content-center align-items-center gap-3">
                          <div className="flex-grow-1 text-black fs-5 lh-lg">SEFiO offers free counseling to all applicants, at any stage in the process. We recommend requesting this as soon as possible.</div>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-start gap-3">
                          <Link to="/counseling" className="text-decoration-none text-primary">Apply for counseling</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                <div className="h-190 d-flex flex-column justify-content-center align-items-center gap-3">
                  <div className="d-flex justify-content-center align-items-center gap-3">
                    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center gap-3">
                      <div className="d-flex justify-content-center align-items-center gap-3">
                        <div className="flex-grow-1 text-black fs-5 lh-lg">Below you will find our application forms used to evaluate your project/business. Feel free to download and start your application. Remember that our great advisory team is ready to help elevate your application. Projects utilizing counseling before submitting usually reach higher in the evaluation.</div>
                      </div>
                      <div className="d-flex justify-content-start align-items-center gap-3">
                        <div className="d-flex gap-3">
                            <a role='link' onClick={() => openInNewTab("https://docs.google.com/document/d/1bwx2Jk3mT1_1m4EuPOQZmkWAVHkqoI0cw3u2iY9IWo4/edit")} className='text-decoration-none'>English</a>                            
                            <a role='link' onClick={() => openInNewTab("https://docs.google.com/document/d/1XH7RPoE6wd3AJ8ydJxMuYLVUPb9uIGNuAizkaYoSAJ0/edit")} className='text-decoration-none'>Norwegian</a> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-3">
                    <div className="flex-grow-1 text-black fs-5 lh-lg">After each deadline, all applications are processed within two (2) weeks. During those two weeks, the counseling team will contact you. One (1) week later the projects/businesses that are to present before the jury are chosen and invited to the final. You will then have one (1) week to prepare for the jury.</div>
                    </div>
                  <div className="h-70 d-flex flex-column justify-content-center align-items-center gap-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="flex-grow-1 text-black fs-5 lh-lg">If you did not make it this round, you will be offered counseling and the chance to apply in the next round.</div>
                    </div>
                  </div>
                </div>
              </div>
            </span>
            <p><button onClick={myFunction} id='myBtn'>Read More</button></p>
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
