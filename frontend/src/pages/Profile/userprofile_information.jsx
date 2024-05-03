import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserProfile } from '../../Redux/userStates/usersSlicer.js';
import { fetchCurrentUser } from '../../Redux/userStates/usersSlicer.js';
import { changePassword } from '../../Redux/userStates/userActions.js';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import '../../css/profile.css';
import personalprofileImage from '../../../../assets/images/profile/personal_profile.png';
import rocketImage from '../../../../assets/images/home/rocket.png';
import collaborationprofileImage from '../../../../assets/images/profile/collaboration_profile.png';
import { change_password_failure } from '../../Redux/userStates/actionTypes.js';
import { app } from '../../firebase.js';
import {
  initialUpdatedUser,
  endUpdatedUser,
  failUpdatedUser,
} from '../../Redux/userStates/usersSlicer.js';

const ProfileInformation = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector(state => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(initialUpdatedUser());
    try {
      const response = await fetch(`/api/user/update-basic-info/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(failUpdatedUser(data.message || "Update failed"));
        return;
      }
      dispatch(endUpdatedUser(data));
    } catch (error) {
      dispatch(failUpdatedUser(error.toString()));
    }
  };
  


    return (
      <div className="container page-container">
        <div style={{ height: '70px' }} />
          <div className="row justify-content-center gap-3">
            <div className='col-lg-4'>
              <div className='title-container'>
                <h1 className="profile-title">My Profile</h1>
              </div>
              <form onSubmit={handleSubmit} className='form-container'>
                {currentUser && (
                  <>
                  <div className="form-group form-box">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control form-input" 
                      id="fullName" 
                      onChange={handleChange}
                      defaultValue={currentUser.fullName}
                    />                
                  </div>
                  <div className="form-group form-box">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control form-input" 
                        id="email" 
                        defaultValue={currentUser.email}
                        placeholder="Email"
                        onChange={handleChange}
                      />                
                  </div>
                  <button className='btn secondary-button'>
                    {loading ? "Loading in progress..." : "Update"}
                  </button>
                  </>
                )}
              </form>
              <form className='form-container'>
                  <div className="form-group form-box">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input 
                      className="form-control form-input" 
                      id="newPassword"
                      />
                    <button type="button"> knapp
                    </button>
                  </div>
                  <div className="form-group form-box">
                    <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                    <input 
                      className="form-control form-input" 
                      id="confirmNewPassword"/>
                    <button type="button">knapp
                    </button>
                  </div>
                <button type="submit">Change Password</button>
              </form>
            </div>
            <div className='divide-profile'>
                <span className='divide-profile-line'></span>
            </div>
            <div className="col-lg-4">
              <div className="title-container">
                <h1 className="profile-title">Collaboration Profile</h1>
              </div>
              <div className="description-container">
                <p className="description">Do you want to create a profile so others can find and connect with you?</p>
              </div>
              <div className="button-container">
                <Link to="/collaborate" className="btn btn-primary secondary-button">Create a profile</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default ProfileInformation;

