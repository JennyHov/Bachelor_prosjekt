import React from 'react';
import CollaborateWithProfile from './collaborate_with_profile';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../css/collaborate.css';

import stockImage from '../../../../assets/images/profilePics/stock_photo.jpg';

export default function Collaborate() {
  const hasProfile = false; // Endre dette med riktig logikk senere

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center gap-3">
        <div className="col-lg-6 collaboration-container">
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
        {/* Profile Cards */}
        <div className="row profile-row">
          <div className="col-md-3 coprofile">
            <div className="coprof-image-content">
              <div className="coprofile-image">
                <img className="coprofile-img" src={stockImage} alt="Card Image" />
              </div>
            </div>
            <div className="coprofile-content">
                <p className="coprofile-name">Lars Johansen</p> 
                <hr className="name-divider" />
                <p className="coprofile-category">Technology</p>
                <p className="coprofile-description">Created a revolutionary AI-powered virtual assistant that streamlines administrative tasks for small businesses</p>
                <p className="coprofile-email"><a href="mailto:kontakt@sefio.no">lars.johansen@example.com</a></p>
            </div>
          </div>
          <div className="col-md-3 coprofile">
            <div className="coprof-image-content">
              <div className="coprofile-image">
                <img className="coprofile-img" src={stockImage} alt="Card Image" />
              </div>
            </div>
            <div className="coprofile-content">
                <p className="coprofile-name">Ingrid Olsen</p>
                <hr className="name-divider" />
                <p className="coprofile-category">Environment</p>
                <p className="coprofile-description">Proposed a community-driven reforestation initiative using drone technology to plant trees in deforested areas</p>
                <p className="coprofile-email"><a href="mailto:kontakt@sefio.no">ingrid.olsen@example.com</a></p>
            </div>
          </div>
          <div className="col-md-3 coprofile">
            <div className="coprof-image-content">
              <div className="coprofile-image">
                <img className="coprofile-img" src={stockImage} alt="Card Image" />
              </div>
            </div>
            <div className="coprofile-content">
                <p className="coprofile-name">Henrik Andreasen</p>
                <hr className="name-divider" />
                <p className="coprofile-category">People</p>
                <p className="coprofile-description">Introduced a gamified learning platform that engages students in interactive lessons tailored to their individual learning styles</p>
                <p className="coprofile-email"><a href="mailto:kontakt@sefio.no">henrik.andreasen@example.com</a></p>
            </div>
          </div>
          <div className="col-md-3 coprofile">
            <div className="coprof-image-content">
              <div className="coprofile-image">
                <img className="coprofile-img" src={stockImage} alt="Card Image" />
              </div>
            </div>
            <div className="coprofile-content">
                <p className="coprofile-name">Astrid Larsen</p>
                <hr className="name-divider" />
                <p className="coprofile-category">Technology</p>
                <p className="coprofile-description">Proposed a blockchain-based platform that securely connects freelance professionals with clients worldwide</p>
                <p className="coprofile-email"><a href="mailto:kontakt@sefio.no">astrid.larsen@example.com</a></p>
            </div>
          </div>
        </div>  
        <div className='row profile-row'>
          <div className="col-sm-3 coprofile">
            <div className="coprof-image-content">
              <div className="coprofile-image">
                <img className="coprofile-img" src={stockImage} alt="Card Image" />
              </div>
            </div>
            <div className="coprofile-content">
                <p className="coprofile-name">Einar Pedersen</p>
                <hr className="name-divider" />
                <p className="coprofile-category">Technology</p>
                <p className="coprofile-description">Pitched a renewable energy solution harnessing kinetic energy from urban environments</p>
                <p className="coprofile-email"><a href="mailto:kontakt@sefio.no">einar.pedersen@example.com</a></p>
            </div>
          </div>
          <div className="col-sm-3 coprofile">
            <div className="coprof-image-content">
              <div className="coprofile-image">
                <img className="coprofile-img" src={stockImage} alt="Card Image" />
              </div>
            </div>
            <div className="coprofile-content">
                <p className="coprofile-name">Hanne Sørensen</p>
                <hr className="name-divider" />
                <p className="coprofile-category">Environment</p>
                <p className="coprofile-description">Pitched a solar-powered desalination system designed to provide clean drinking water to remote coastal communities</p>
                <p className="coprofile-email"><a href="mailto:kontakt@sefio.no">hanne.sorensen@example.com</a></p>
            </div>
          </div>
          <div className="col-sm-3 coprofile">
            <div className="coprof-image-content">
              <div className="coprofile-image">
                <img className="coprofile-img" src={stockImage} alt="Card Image" />
              </div>
            </div>
            <div className="coprofile-content">
                <p className="coprofile-name">Kristoffer Solberg</p>
                <hr className="name-divider" />
                <p className="coprofile-category">People</p>
                <p className="coprofile-description">Launched a mental health app offering personalized therapy sessions and peer support networks</p>
                <p className="coprofile-email"><a href="mailto:kontakt@sefio.no">kristoffer.solberg@example.com</a></p>
            </div>
          </div>
          <div className="col-sm-3 coprofile">
            <div className="coprof-image-content">
              <div className="coprofile-image">
                <img className="coprofile-img" src={stockImage} alt="Card Image" />
              </div>
            </div>
            <div className="coprofile-content">
                <p className="coprofile-name">Mari Haugen</p>
                <hr className="name-divider" />
                <p className="coprofile-category">Environment</p>
                <p className="coprofile-description">Developed a smart waste management solution using IoT sensors and AI algorithms to optimize recycling processes</p>
                <p className="coprofile-email"><a href="mailto:kontakt@sefio.no">mari.haugen@example.com</a></p>
            </div>
          </div>
        </div>
      </div>
  );
}
