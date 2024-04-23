import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserProfile } from '../../Redux/userStates/usersSlicer.js';
import { signOut, initialDeleteUser, endDeleteUser, failDeleteUser, initialUpdatedUser, endUpdatedUser, failUpdatedUser } from '../../Redux/userStates/usersSlicer';
import { fetchCurrentUser } from '../../Redux/userStates/usersSlicer.js';
import { changePassword } from '../../Redux/userStates/userActions.js';

import '../../css/profile.css';
import personalprofileImage from '../../../../assets/images/profile/personal_profile.png';
import rocketImage from '../../../../assets/images/home/rocket.png';
import collaborationprofileImage from '../../../../assets/images/profile/collaboration_profile.png';
import { change_password_failure } from '../../Redux/userStates/actionTypes.js';

const ProfileInformation = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [customAlertMessage, setCustomAlertMessage] = useState(''); // State for custom alert message
  const [showCustomAlert, setShowCustomAlert] = useState(false); // State to control visibility of custom alert
  const [updatedFullName, setUpdatedFullName] = useState(''); // Define updatedFullName state
  const [updatedEmail, setUpdatedEmail] = useState(''); // Define updatedEmail state
  const [formData, setFormData] = useState('');
  
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if currentUser is not null or undefined before dispatching fetchCurrentUser
    if (currentUser && currentUser._id) {
      dispatch(fetchCurrentUser(currentUser._id)); // Pass currentUser._id as userId
    }
  }, [currentUser, dispatch]);

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
      setCustomAlertMessage("New passwords do not match!");
      setCustomAlertMessage(true);
      return;
    }
  
    try {
      // Dispatch the changePassword action with userId
      dispatch(changePassword(currentUser._id, currentPassword, newPassword));
      setCustomAlertMessage("Password changed successfully!");
      setCustomAlertMessage(true);
    } catch (error) {
      setCustomAlertMessage("Failed to change password. Please try again", error);
      setCustomAlertMessage(true);
      console.error ("Error chaning password: ", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the logged-in user is authorized to update the profile
      if (currentUser && currentUser._id) {
        const formData = {
          fullName: updatedFullName,
          email: updatedEmail,
          // Add other fields as needed
        };
        const result = updateUserProfile(currentUser._id, formData);
        if (result.success) {
          setSuccessfulUpdate(true);
        } else {
          // Handle error, show error message, etc.
          console.error("Error updating profile:", result.message);
        }
      } else {
        // If the logged-in user is not authorized, display an error message or prevent submission
        console.error("Unauthorized: You can only update your own profile");
      }
    } catch (error) {
      // Handle error, show error message, etc.
      console.error("Error updating profile:", error);
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
                      value={updatedFullName} 
                      onChange={(e) => setUpdatedFullName(e.target.value)} 
                    />                
                  </div>
                  <div className="form-group form-box">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control form-input" 
                        id="email" 
                        value={updatedEmail} 
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                      />                
                  </div>
                  <button className='btn secondary-button'>
                    {loading ? "Loading in progress..." : "Update"}
                  </button>
                  </>
                )}
              </form>
              <form onSubmit={handlePasswordChange} className='form-container'>
              {showCustomAlert && <CustomAlert message={customAlertMessage} onClose={() => setShowCustomAlert(false)} />}
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

