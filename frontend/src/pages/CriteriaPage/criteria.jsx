import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Criteria() {

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
      };
    
  return (
    <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 signup-container">
                <div className="title-container">
                    <h1 className="signup-title">Read Our Criteria</h1>
                </div>
                <div className="form-container">
                    <div className="input-group">
                        <p className="form-text">We have some criteria that are good to know before you apply!</p>
                    </div>
                </div>
                <div className="counseling-section">
                    <div className="criteria-heading">
                        <h2 className="criteria-title">Counseling Criteria</h2>
                    </div>
                    <div className="criteria-content">
                        <p className="criteria-description">SEFiO offers free counseling to all applicants, at any stage in the process. We recommend requesting this as soon as possible.</p>
                        <Link to="/counseling" className="btn btn-primary">Apply for counseling</Link>
                    </div>
                </div>
                <div className="application-template-section">
                    <div className="criteria-heading">
                        <h2 className="criteria-title">Application Template</h2>
                    </div>
                    <div className="criteria-content">
                        <p className="criteria-description">Below you will find our application forms used to evaluate your project/business. Feel free to download and start your application. Remember that our great advisory team is ready to help elevate your application. Projects utilizing counseling before submitting usually reach higher in the evaluation.</p>
                        <div className="language-links">
                            <a role='link' onClick={() => openInNewTab("https://docs.google.com/document/d/1bwx2Jk3mT1_1m4EuPOQZmkWAVHkqoI0cw3u2iY9IWo4/edit")} className='text-decoration-none'>English</a>                            
                            <a role='link' onClick={() => openInNewTab("https://docs.google.com/document/d/1XH7RPoE6wd3AJ8ydJxMuYLVUPb9uIGNuAizkaYoSAJ0/edit")} className='text-decoration-none'>Norwegian</a> 
                        </div>
                    </div>
                </div>
                <div className="after-submission-section">
                    <div className="criteria-heading">
                        <h2 className="criteria-title">After Submission</h2>
                    </div>
                    <div className="criteria-content">
                        <p className="criteria-description">After each deadline, all applications are processed within two (2) weeks. During those two weeks, the counseling team will contact you. One (1) week later the projects/businesses that are to present before the jury are chosen and invited to the final. You will then have one (1) week to prepare for the jury.</p>
                    </div>
                </div>
                <div className="important-deadlines-section">
                    <div className="criteria-heading">
                        <h2 className="criteria-title">Important Deadlines</h2>
                    </div>
                    <div className="criteria-content">
                        <p className="criteria-description">If you did not make it this round, you will be offered counseling and the chance to apply in the next round.</p>
                        <p className="deadline-details">Next deadline: 08.03.2024</p>
                        <p className="deadline-details">Feedback within: 22.03.3034</p>
                        <p className="deadline-details">Finalists announced: 03.04.2024</p>
                        <p className="deadline-details">Presentation with jury: 09.04.2024</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}