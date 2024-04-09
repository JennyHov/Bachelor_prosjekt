import React from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <div className="container">
        <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 thank-you-container">
                <div className="title-container">
                    <h1 className="thank-you-title">Thank you!</h1>
                </div>
                <div className="message-container">
                    <p className="thank-you-message">Your application has now been submitted! You will receive updates on the email you entered.</p>
                </div>
                <div className="button-container">
                    <Link to="/home" className="btn btn-primary">Go home</Link>
                </div>
            </div>
        </div>
    </div>
  );
}
