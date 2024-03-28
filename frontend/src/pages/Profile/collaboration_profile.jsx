import React from 'react';

export default function CollaborationProfile({ hasProfile }) {
  if (!hasProfile) {
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 collaboration-profile-container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-12">
                <div className="title-container">
                  <h1 className="collaboration-profile-title">You do not have a collaboration profile</h1>
                </div>
                <div className="description-container">
                  <p className="collaboration-profile-description">Do you want to create a profile so others can find and connect with you?</p>
                </div>
                <div className="button-container">
                  <button type="button" className="btn btn-orange btn-create-profile">Create Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 collaboration-profile-container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-12">
                <div className="title-container">
                  <h1 className="collaboration-profile-title">Profile</h1>
                </div>
                {/* Render profile information */}
              </div>
            </div>
          </div>
          <div className="col-lg-4 image-container">
            {/* <img className="img-fluid" src="https://via.placeholder.com/429x411" alt="Profile Image" /> */}
          </div>
        </div>
      </div>
    );
  }
}
