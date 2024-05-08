
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      toast.success('Profile updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
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
      toast.error("Passwords do not match.", { // Display this error via toast
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      setError("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.");
      setLoadingPassword(false);
      toast.info("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
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
        toast.success(data.message, { // Use server's error message for toast
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      } else {
        dispatch(endUpdatedUser("Password updated successfully"));
        setError(''); // Nullstill feilmeldingen hvis oppdateringen var vellykket
      }
    } catch (error) {
      setError("Failed to connect to the server.");
      dispatch(failUpdatedUser(error.toString()));
      toast.info("Failed to connect to the server.", { // Use info toast for connection issues
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
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
      toast.success('Profile deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
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
      toast.success('Collaborate profile deleted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
  } catch (error) {
      alert(error.message);
  }
};

  
    return (
      
      <div className="container page-container">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable theme="light" />
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
