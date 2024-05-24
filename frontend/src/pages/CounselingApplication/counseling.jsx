import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/pages.css';
import SubmitCounselingForm from './counselingForm';

export default function SubmitApplication() {
  return (
    <div className="container page-container">
      <div style={{ height: '70px' }} />
  
      <header className="row justify-content-center align-items-center">
        <div className="col-lg-8 submit-application-container">
          <div className="title-container">
            <h1 className="page-title submit-application-title">Apply for Counseling</h1>
          </div>
        </div>
      </header>
  
      <main className="row justify-content-center align-items-center">
        <div className="col-lg-6 submit-application-container">
          <section className="message-container">
            <p className="page-message submit-application-message">
              Our counseling application is designed to offer a convenient and effective platform for connecting you with counselors who can provide guidance, support, and resources.
              The inquiry will be handled by a SEFiO representative from your educational institution.
            </p>
          </section>
          
          <section>
            <SubmitCounselingForm />
          </section>
        </div>
      </main>
    </div>
  );
}
