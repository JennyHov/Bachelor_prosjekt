import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initialUpdatedUser, endUpdatedUser, failUpdatedUser } from '../../Redux/userStates/usersSlicer.js';
import { fetchCurrentUser } from '../../Redux/userStates/usersSlicer.js';
import { changePassword } from '../../Redux/userStates/userActions.js';

import '../../css/profile.css';
import personalprofileImage from '../../../../assets/images/profile/personal_profile.png';
import rocketImage from '../../../../assets/images/home/rocket.png';
import collaborationprofileImage from '../../../../assets/images/profile/collaboration_profile.png';

const ProfileInformation = () => {
  const { currentUser, loading, error } = useSelector(state => state.user); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!currentUser) {
      // Assuming you have access to the userId from somewhere (e.g., auth token)
      dispatch(fetchCurrentUser(userId));
    }
  }, [dispatch, currentUser]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    // Prompt the user to enter their current password
    const currentPassword = prompt("Please enter your current password:");
    if (!currentPassword) {
      // User canceled entering the current password
      return;
    }
  
    // Validate if the new passwords match
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }
  
    try {
      // Dispatch the changePassword action with userId
      dispatch(changePassword(currentUser._id, currentPassword, newPassword));
      alert("Password changed successfully!");
    } catch (error) {
      // Handle any errors
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
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
              <form>
                <div className="form-container">
                <div className="form-group form-box">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input type="text" className="form-control form-input" id="fullName" value={currentUser.fullName} readOnly />
                </div>
                <div className="form-group form-box">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control form-input" id="email" value={currentUser.email} readOnly />
                </div>
                </div>
              </form>
              <form onSubmit={handlePasswordChange} className='form-container'>
                  <div className="form-group form-box">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input 
                      className="form-control form-input" 
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}/>
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                      {showNewPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="form-group form-box">
                    <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                    <input 
                      className="form-control form-input" 
                      id="confirmNewPassword"
                      type={showConfirmNewPassword ? "text" : "password"}
                      value={confirmNewPassword}
                      onChange={e => setConfirmNewPassword(e.target.value)}/>
                    <button type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                      {showConfirmNewPassword ? "Hide" : "Show"}
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

