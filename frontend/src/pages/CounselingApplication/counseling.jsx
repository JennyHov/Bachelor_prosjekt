import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/pages.css';
import SubmitCounselingForm from './counselingForm';

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
          <SubmitCounselingForm />
        </div>
      </div>
    </div>
  );
}
