import React from 'react';
import CollaborateWithProfile from './collaborate_with_profile';
import 'bootstrap/dist/css/bootstrap.min.css';

import henrikImage from '../../../../assets/images/home/henrik.png';
import hannaImage from '../../../../assets/images/home/hanna.png';
import magnusImage from '../../../../assets/images/home/magnus.png';
import johanImage from '../../../../assets/images/home/johan.png';
import elisabethImage from '../../../../assets/images/home/elisabeth.png';
import arnarImage from '../../../../assets/images/home/arnar.png';

export default function Collaborate() {
  const hasProfile = false; // Endre dette med riktig logikk senere

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center gap-3">
        <div className="col-lg-6 collaboration-container">
          <div className="row justify-content-center align-items-start gap-3">
            <div className="title-container">
              <h1 className="collaboration-title">Become more visible!</h1>
            </div>
            <div className="message-container">
              <p className="collaboration-message">
                We at SEFiO want to help students find a team or startups finding new members for their team
              </p>
            </div>
            <div className="form-container">
              {hasProfile ? (
                <CollaborateWithProfile />
              ) : (
                <div className='form-container'>
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label text-black font-normal font-inter text-sm leading-7">Full Name</label>
                    <input type="text" className="form-control" id="fullName" placeholder="Enter your full name" />
                    <small id="fullNameHelp" className="form-text text-zinc-300 font-normal font-inter text-sm leading-7">Autofill</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label text-black font-normal font-inter text-sm leading-7">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    <small id="emailHelp" className="form-text text-zinc-300 font-normal font-inter text-sm leading-7">Autofill</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="institution" className="form-label text-black font-normal font-inter text-sm leading-7">Institution</label>
                    <input type="text" className="form-control" id="institution" placeholder="Enter your institution" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description" className="form-label text-black font-normal font-inter text-sm leading-7">Description</label>
                    <textarea className="form-control" id="description" rows="3" placeholder="Write a description about what you're looking for or tell about yourself and ideas!"></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="category" className="form-label text-black font-normal font-inter text-sm leading-7">Category</label>
                    <select className="form-select" id="category" placeholder="Choose a category">
                      <option>Technology</option>
                      <option>Environmental</option>
                      <option>People</option>
                      <option>Health</option>
                      {/* Legg til kategorier her */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="role" className="form-label text-black font-normal font-inter text-sm leading-7">Role</label>
                    <select className="form-select" id="role">
                      <option>Student</option>
                      <option>Professor</option>
                      <option>Group</option>
                      {/* Add options here */}
                    </select>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="publishCheck" />
                    <label className="form-check-label text-black font-normal font-inter text-sm leading-7" htmlFor="publishCheck">I accept to get published on the website</label>
                  </div>
                  <div className='button-container'>
                    <button type="submit" className="btn btn-primary btn-submit-profile mt-3">Submit Profile</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          {/* Profile Cards */}
          <div className='row justify-content-center contact-profile my-5'>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={magnusImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Magnus Svendsen</p>
                        <p className="contact-role">CEO</p>
                        <p className="contact-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                    </div>
                </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={hannaImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Hanna Worum</p>
                        <p className="contact-role">Chief of Board</p>
                        <p className="contact-email"><a href="mailto:Hanna.worum@sefio.no">Hanna.worum@sefio.no</a></p>
                    </div>
                </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={henrikImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Henrik Mørk</p>
                        <p className="contact-role">CFO</p>
                        <p className="contact-email"><a href="mailto:henrik.mork@sefio.no">henrik.mork@sefio.no</a></p>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center contact-profile my-5'>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={johanImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Johan Sandbu</p>
                        <p className="contact-role">Board Representative - Høyskolen Kristiania</p>
                        <p className="contact-email"><a href="mailto:Johan.sandbu@sefio.no">Johan.sandbu@sefio.no</a></p>
                    </div>
                </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={elisabethImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Elisabeth Alvern</p>
                        <p className="contact-role">Board Representative - NMBU</p>
                        <p className="contact-email"><a href="mailto:Hanna.worum@sefio.no">Hanna.worum@sefio.no</a></p>
                    </div>
                </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={arnarImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Arnar Reiten</p>
                        <p className="contact-role">Board Representative - UIO</p>
                        <p className="contact-email"><a href="mailto:Arnar.reiten@sefio.no">Arnar.reiten@sefio.no</a></p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
