import React from 'react';

export default function ProfileInformation() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-8 profile-information-container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-4">
              {/* <img className="img-fluid" src="https://via.placeholder.com/449x449" alt="Profile" /> */}
            </div>
            <div className="col-lg-8">
              <div className="title-container">
                <h1 className="profile-information-title">Personal information</h1>
              </div>
              <div className="form-container">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="fullName" value="Jenny Hovland" readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value="jenny.hovland@gmail.com" readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="birthDate" className="form-label">Birth Date</label>
                  <input type="text" className="form-control" id="birthDate" value="26-10-1999" readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="oldPassword" className="form-label">Old Password</label>
                  <input type="password" className="form-control" id="oldPassword" />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input type="password" className="form-control" id="newPassword" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                  <input type="password" className="form-control" id="confirmNewPassword" />
                </div>
              </div>
              <div className="button-container">
                <button type="submit" className="btn btn-primary btn-change">Change</button>
                <button type="button" className="btn btn-danger btn-cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
