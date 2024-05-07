
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../css/profile.css';
import {
  initialUpdatedUser,
  endUpdatedUser,
  failUpdatedUser,
  initialDeleteUser,
  failDeleteUser,
  endDeleteUser,
} from '../../Redux/userStates/usersSlicer.js';

const ProfileInformation = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });
  const [error, setError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loadingBasicInfo, setLoadingBasicInfo] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

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
      setError("Passwords do not match.");
      setLoadingPassword(false);
      return;
    }
  
    try {
      const response = await fetch(`/api/user/update-password/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: formData.newPassword }),
      });
      const data = await response.json();
  
      if (!data.success) {
        setError(data.message); // Bruk serverens feilmelding
        dispatch(failUpdatedUser(data.message));
      } else {
        dispatch(endUpdatedUser("Password updated successfully"));
        setError(''); // Nullstill feilmeldingen hvis oppdateringen var vellykket
      }
    } catch (error) {
      setError("Failed to connect to the server.");
      dispatch(failUpdatedUser(error.toString()));
    } finally {
      setLoadingPassword(false);
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(initialDeleteUser());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(failDeleteUser(data));
        return;
      }
      dispatch(endDeleteUser(data));
    } catch (error) {
      dispatch(failDeleteUser(error));
    }
  };

  // ProfileInformation component
const handleDeleteProfile = async () => {
  try {
      const response = await fetch(`/api/profile/delete/${currentUser._id}`, {
          method: 'DELETE'
      });
      if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to delete profile');
      }
  } catch (error) {
      alert(error.message);
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
              {error && (
                <div className="alert alert-danger" role="alert" aria-live="assertive">
                  {error}
                </div>
              )}
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
              <div className="container">
                <button onClick={handleDeleteAccount}>Delete Account</button>
              </div>
              <div className="container">
                <h1>My Profile</h1>
                <button onClick={handleDeleteProfile}>Delete My Profile</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default ProfileInformation;
