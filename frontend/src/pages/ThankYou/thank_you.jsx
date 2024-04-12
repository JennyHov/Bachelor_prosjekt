import React from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <div className="container page-container">
        <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 thank-you-container">
                <div className="page-title title-container">
                    <h1 className="thank-you-title">Thank you!</h1>
                </div>
                <div className="message-container">
                    <p className="page-message thank-you-message">Your application has now been submitted! You will receive updates on the email you entered.</p>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className="form-button">
                        <Link to="/home" className="btn secondary-button">Go home</Link>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  );
}
