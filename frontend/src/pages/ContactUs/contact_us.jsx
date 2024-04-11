import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SubmitApplication() {
  return (
    <div className="container page-container">
      <div className="row justify-content-center align-items-center">
        <form action="https://api.web3forms.com/submit" method="POST" className="col-lg-6 submit-application-container">
          <div className="title-container">
            <h1 className="page-title submit-application-title">Contact us</h1>
          </div>
          <div className="message-container">
            <p className="submit-application-message">
                Do you have any questions, inquiries or would like us to add something to the calendar - send us a message!
            </p>
          </div>
            <input type="hidden" name="access_key" value="1a1c7959-8cd2-407b-82de-04a56a29837c"/>
            <label htmlFor="email" className="form-label">Our Email</label>
            <input type="email" className="form-control text-muted" name="ouremail" value="kontakt@sefio.no" readOnly />
          
            <label htmlFor="email" className="form-label">Your Email</label>
            <input type="email" className="form-control" name="email" placeholder="Type in your email" />

            <label htmlFor="name" className="form-label">Name</label>
            <input className="form-control" name="name" placeholder="Type in your name" />

            <label htmlFor="projectName" className="form-label">Subject</label>
            <input type="text" className="form-control" name="subject" placeholder="Subject for your inquiry" />
          
            <label htmlFor="comments" className="form-label">Comments</label>
            <textarea className="form-control" name="comments" rows="3" placeholder="Write your text here"></textarea>
          {/*
            <label htmlFor="upload" className="form-label">Upload application here</label>
            <input type="file" className="form-control-file" name="upload" />
            <small className="form-text text-muted">Click or drag a file to this area to upload</small>
          */}
            <button type='submit' className='btn btn-primary'>Submit</button>
        
        </form>

      </div>
    </div>
  );
}

/*
export default function SubmitApplication() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <form action="https://api.web3forms.com/submit" method="POST" className="col-lg-6 submit-application-container">
          <div className="title-container">
            <h1 className="submit-application-title">Contact us</h1>
          </div>
          <div className="message-container">
            <p className="submit-application-message">
                Do you have any questions, inquiries or would like us to add something to the calendar - send us a message!
            </p>
          </div>
          <div className="form-container">
            <div className="form-group text-muted">
              <label htmlFor="email" className="form-label">Our Email</label>
              <input type="email" className="form-control text-muted" id="email" value="kontakt@sefio.no" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input type="email" className="form-control" id="email" placeholder="Type in your email" />
            </div>
            <div className="form-group">
              <label htmlFor="projectName" className="form-label">Subject</label>
              <input type="text" className="form-control" id="projectName" placeholder="Subject for your inquiry" />
            </div>
            <div className="form-group">
              <label htmlFor="comments" className="form-label">Contents</label>
              <textarea className="form-control" id="comments" rows="3" placeholder="Write your text here"></textarea>
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
        </form>

      </div>
    </div>
  );
}
*/