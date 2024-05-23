import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/process.css';

export default function Process() {

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
      };
    
      return (
        <div className="container page-container">
          <div style={{ height: '70px' }} />
          <section className="row justify-content-center align-items-center">
            <div className="col-lg-6 signup-container">
              <header className="title-container">
                <h1 className="page-title signup-title">Our Process</h1>
              </header>
              <div className="message-container">
                <p className="page-message">Before you apply for funding, it's important to understand our process and the support we offer. By understanding and following these steps, you'll be well-prepared for our application process. Good luck!</p>
              </div>
            </div>
          </section>
          <section className="row justify-content-center">
            <div className="col">
              <nav className="timeline">
                <article className='process-container left'>
                  <div className="process-content">
                    <h3>1. Counseling Criteria</h3>
                    <p>SEFiO offers free counseling to all applicants, at any stage in the process. We recommend requesting this as soon as possible.</p>
                    <Link to="/counseling" className="text-primary">Apply for counseling</Link>
                  </div>
                </article>
                <article className='process-container right'>
                  <div className="process-content">
                    <h3>2. Application Template</h3>
                    <p>Below you will find our application forms used to evaluate your project/business. Feel free to download and start your application. Remember that our great advisory team is ready to help elevate your application. Projects utilizing counseling before submitting usually reach higher in the evaluation.</p>
                    <div className="d-flex justify-content-start align-items-center gap-3">
                      <div className="d-flex gap-3">
                        <a role='link' onClick={() => openInNewTab("https://docs.google.com/document/d/1bwx2Jk3mT1_1m4EuPOQZmkWAVHkqoI0cw3u2iY9IWo4/edit")} className='text-primary'>English</a>
                        <a role='link' onClick={() => openInNewTab("https://docs.google.com/document/d/1XH7RPoE6wd3AJ8ydJxMuYLVUPb9uIGNuAizkaYoSAJ0/edit")} className='text-primary'>Norwegian</a>
                      </div>
                    </div>
                  </div>
                </article>
                <article className='process-container left'>
                  <div className="process-content">
                    <h3>3. After Submission</h3>
                    <p>After each deadline, all applications are processed within two (2) weeks. During those two weeks, the counseling team will contact you. One (1) week later the projects/businesses that are to present before the jury are chosen and invited to the final. You will then have one (1) week to prepare for the jury.</p>
                  </div>
                </article>
                <article className='process-container right'>
                  <div className="process-content">
                    <h3>4. Important Deadlines</h3>
                    <p>If you did not make it this round, you will be offered counseling and the chance to apply in the next round.</p><br></br>
                    <p>Next deadline: 08.03.2024</p>
                    <p>Feedback within: 22.03.2024</p>
                    <p>Finalists announced: 03.04.2024</p>
                    <p>Presentation with jury: 09.04.2024</p>
                  </div>
                </article>
              </nav>
            </div>
          </section>
          <div className="d-flex justify-content-center">
            <Link to="/submit-application" className="btn btn-primary secondary-button">Apply For Funding</Link>
          </div>
        </div>
      );
}