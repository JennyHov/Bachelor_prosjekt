import React from 'react';

import ContactForm from './ContactForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/form.css';

export default function SubmitApplication() {
  return (
    <main className="container page-container">
      <div style={{ height: '70px' }}></div>
      <div className="row justify-content-center align-items-center">
        <section className="col-lg-6 submit-application-container">
          <header className="title-container">
            <h1 className="page-title submit-application-title">Contact us</h1>
          </header>
          <article className="message-container">
            <p className="page-message submit-application-message">
              Do you have any questions, inquiries or would like us to add something to the calendar - send us a message!
            </p>
          </article>
          <ContactForm />
        </section>
      </div>
    </main>
  );  
}
