
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../css/profile.css';
import {
  initialUpdatedUser,
  endUpdatedUser,
  failUpdatedUser,
} from '../../Redux/userStates/usersSlicer.js';

const ProfileInformation = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loadingBasicInfo, setLoadingBasicInfo] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector(state => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingBasicInfo(true); // Aktiver lastetilstand for grunnleggende info
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
    }finally {
      setLoadingBasicInfo(false); // Deaktiver lastetilstand
    }
  };
  const handlePasswordUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoadingPassword(true);
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("Passwords do not match.");
      return;
    }

    dispatch(initialUpdatedUser());
    try {
      const response = await fetch(`/api/user/update-password/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: formData.newPassword }),
      });
      const data = await response.json();
      if (!data.success) {
        dispatch(failUpdatedUser(data.message || "Password update failed"));
        return;
      }
      dispatch(endUpdatedUser("Password updated successfully"));
    } catch (error) {
      dispatch(failUpdatedUser(error.toString()));
    } finally {
      setLoadingPassword(false); // Deaktiver lastetilstand
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
                    {loadingBasicInfo ? "Loading in progress..." : "Update"}
                  </button>
                  </>
                )}
              </form>
              <form onSubmit={handlePasswordUpdateSubmit} className='form-container'>
                <div className="form-group form-box">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input 
                    type={showNewPassword ? "text" : "password"}
                    className="form-control form-input" 
                    id="newPassword"
                    value={formData.newPassword || ''}
                    onChange={handleChange}
                  />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className='btn secondary-button'>
                    {showNewPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="form-group form-box">
                  <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                  <input 
                    type={showConfirmNewPassword ? "text" : "password"}
                    className="form-control form-input" 
                    id="confirmNewPassword"
                    value={formData.confirmNewPassword || ''}
                    onChange={handleChange}
                  />
                  <button type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className='btn secondary-button'>
                    {showConfirmNewPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <button type="submit" className='btn secondary-button'>
                  {loadingPassword ? "Changing Password..." : "Change Password"}
                </button>
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
