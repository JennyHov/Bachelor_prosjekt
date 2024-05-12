
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useProfiles } from '../../contexts/ProfileContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  const [profileData, setProfileData] = useState({});
  const { addOrUpdateProfile } = useProfiles();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loadingBasicInfo, setLoadingBasicInfo] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingCollabInfo, setLoadingCollabInfo] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const [hasCollaborationProfile, setHasCollaborationProfile] = useState(false);
  const [collaborationProfile, setCollaborationProfile] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `profile_images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setProfileData({ ...profileData, profileImageUrl: url });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoadingCollabInfo(true); 
    if (!currentUser) {
        console.error("User must be logged in to update profile");
        return;
    }
    try {
        const method = profileData._id ? 'PUT' : 'POST';
        const endpoint = profileData._id ? `/api/profiles/profiles/${profileData._id}` : '/api/profiles/profiles';
        const response = await fetch(endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profileData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(profileData);
        const updatedProfile = await response.json();
        addOrUpdateProfile(updatedProfile);
        setLoadingCollabInfo(false);
    } catch (error) {
        console.error('Failed to submit profile:', error);
    }
  };
  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileData(prev => ({
        ...prev,
        [name]: value
    }));
  };
  if (!currentUser) {
    return (
        <div className="container page-container">
            <div className="alert alert-warning" role="alert">
                You must be logged in to create or update your profile.
            </div>
        </div>
    );
  }

  useEffect(() => {
    const fetchCollaborationProfile = async () => {
      try {
        const response = await fetch(`/api/profiles/by-user/${currentUser._id}`);
        const data = await response.json();

        if (data && data._id) {
          setCollaborationProfile(data);
          setProfileData({
            fullName: data.fullName || '',
            email: data.email || '',
            institution: data.institution || '',
            description: data.description || '',
            category: data.category || '',
            role: data.role || '',
            profileImageUrl: data.profileImageUrl || ''
          });
          setHasCollaborationProfile(true);
        } else {
          setCollaborationProfile(null);
          setHasCollaborationProfile(false);
        }
      } catch (error) {
        setHasCollaborationProfile(false);
      }
    };

    if (currentUser) {
      fetchCollaborationProfile();
    }
  }, [currentUser]);



  const PasswordRequirements = () => (
    <>
      <div>Password requirements:</div>
      <ul>
        <li>8 characters long</li>
        <li>1 uppercase letter</li>
        <li>1 lowercase letter</li>
        <li>1 number</li>
      </ul>
    </>
  );

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
      setLoadingPassword(false);
      toast.info(<PasswordRequirements />, {
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
      }
    } catch (error) {
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

  const confirmDelete = (message, callback) => {
    const toastId = toast.error(
      <div className="toast-content">
        <div>{message}</div>
        <div className='toast-button-container'>
          <button className="ok-button" onClick={() => {
            toast.dismiss(toastId);
            callback();
          }}>Delete</button>
          <button className="cancel-button" onClick={() => toast.dismiss(toastId)}>Cancel</button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        theme: "colored",
        transition: Bounce,
        closeButton: false,
      }
    );
  };

  const handleDeleteProfile = () => {
    confirmDelete(
      'Are you sure you want to delete your user? This action is irreversible and all your information will be lost.',
      async () => {
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
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          setTimeout(() => {
            navigate('/');
        }, 1600);
        } catch (error) {
          dispatch(failDeleteUser(error));
        }
      }
    )
  };

  // ProfileInformation component
  const handleDeleteCollaborateProfile = async () => {
    confirmDelete (
      'Are you sure you want to delete your collaboration profile? This action is irreversible and all your information will be lost.',
      async () => {
        try {
          const response = await fetch(`/api/profile/delete/${currentUser._id}`, {
              method: 'DELETE'
          });
          const data = await response.json();
          if (response.status === 404) {
            toast.info(data.message || 'No profile to delete.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                });
            } else if (!response.ok) {
                throw new Error(data.message || 'Failed to delete profile');
            } else {
                toast.success('Collaborate profile deleted successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            }
          } catch (error) {
            toast.error(`Error: ${error.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
          });
        }
      }
    )
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
                  <button className='secondary-button'>
                    {loadingBasicInfo ? "Loading in progress..." : "Update"}
                  </button>
                  </>
                )}
              </form>
              <form onSubmit={handlePasswordUpdateSubmit} className='form-container'>
                <div className="form-group form-box">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <div className='password-input-container'>
                    <input 
                    type={showNewPassword ? "text" : "password"}
                    className="form-control form-input" 
                    id="newPassword"
                    value={formData.newPassword || ''}
                    onChange={handleChange}
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className='show-hide-button'>
                      {showNewPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="form-group form-box">
                  <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                  <div className='password-input-container'>
                    <input 
                    type={showConfirmNewPassword ? "text" : "password"}
                    className="form-control form-input" 
                    id="confirmNewPassword"
                    value={formData.confirmNewPassword || ''}
                    onChange={handleChange}
                    />
                    <button type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className='show-hide-button'>
                      {showConfirmNewPassword ? "Hide" : "Show"}
                    </button>
                    </div>
                </div>
                <div className='profile-button-container d-flex'>
                  <button type="submit" className='secondary-button'>
                    {loadingPassword ? "Changing Password..." : "Change Password"}
                  </button>
                </div>
              </form>
              <button onClick={handleDeleteProfile} className='delete-button'>Delete my user</button>
            </div>

            
            <div className='divide-profile'>
                <span className='divide-profile-line'></span>
            </div>
            <div className="col-lg-4">
              <div className="title-container">
                <h1 className="profile-title">Collaboration Profile</h1>
              </div>
              <form onSubmit={handleProfileSubmit} className="form-container">
                {collaborationProfile ? (
                  <>
                  <div className="form-group form-box">
                      <label htmlFor="profileImage" className="form-label">Profile Image</label>
                      <img 
                        src={collaborationProfile.profileImageUrl} 
                        alt="Current profile"
                      />
                      <input 
                        type="file" 
                        className="form-control form-input" 
                        name="profileImage" 
                        placeholder="Profile Image"
                        onChange={handleImageUpload}
                      />                
                  </div>
                  <div className="form-group form-box">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control form-input" 
                      name="fullName" 
                      onChange={handleProfileChange}
                      defaultValue={collaborationProfile.fullName}
                      required
                    />                
                  </div>
                  <div className="form-group form-box">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control form-input" 
                        name="email" 
                        defaultValue={collaborationProfile.email}
                        placeholder="Email"
                        onChange={handleProfileChange}
                        required
                      />                
                  </div>
                  <div className="form-group form-box">
                      <label htmlFor="institution" className="form-label">Institution</label>
                      <select 
                        className="form-select form-input" 
                        name="institution" 
                        onChange={handleProfileChange}
                        value={collaborationProfile.institution}
                        required
                      >
                        <option value="BI">BI</option>
                        <option value="Oslomet">Oslomet</option>
                        <option value="UiO">UiO</option>
                        <option value="NTNU">NTNU</option>
                        <option value="Other">Other</option>
                      </select>                
                  </div>
                  <div className="form-group form-box">
                      <label htmlFor="description" className="form-label">Description</label>
                      <input 
                        type="text" 
                        className="form-control form-input" 
                        name="description" 
                        defaultValue={collaborationProfile.description}
                        placeholder="Description"
                        onChange={handleProfileChange}
                        required
                      />                
                  </div>
                  <div className="form-group form-box">
                      <label htmlFor="category" className="form-label">Category</label>
                      <select 
                        className="form-select form-input" 
                        name="category" 
                        value={collaborationProfile.category}
                        onChange={handleProfileChange}
                        required
                      >
                        <option value="Academic">Academic</option>
                        <option value="Industry">Industry</option>
                      </select>                
                  </div>
                  <div className="form-group form-box">
                      <label htmlFor="role" className="form-label">Role</label>
                      <select  
                        className="form-select form-input" 
                        name="role" 
                        value={collaborationProfile.role}
                        placeholder="Role"
                        onChange={handleProfileChange}
                        required
                      >
                        <option value="Student">Student</option>
                        <option value="Group">Group</option>
                      </select>                
                  </div>
                  <div className='profile-button-container d-flex'>
                    <button className='secondary-button'>
                      {loadingCollabInfo ? "Loading in progress..." : "Update"}
                    </button>
                  </div>
                  </>
                ) : (
                  <p className="description">Do you want to create a profile so others can find and connect with you?
                    <Link to="/collaborate" className="text-primary"> Create a profile.</Link>
                  </p>
                )}
              </form>
              {hasCollaborationProfile && (
                <button onClick={handleDeleteCollaborateProfile} className='delete-button'>Delete my collaboration profile</button>
              )}
            </div>
          </div>
        </div>
      );
    }

export default ProfileInformation;
