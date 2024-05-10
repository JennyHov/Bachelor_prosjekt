import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useProfiles } from '../contexts/ProfileContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'react-toastify/dist/ReactToastify.css';

const PopupCollabForm = () => {
    const [showForm, setShowForm] = useState(false);

    const handleOpenForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    const { addOrUpdateProfile } = useProfiles();
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        institution: '',
        description: '',
        category: '',
        role: '',
        profileImageUrl: ''
    });
    const currentUser = useSelector(state => state.user.currentUser);
    const [hasCollaborationProfile, setHasCollaborationProfile] = useState(false);
    
    useEffect(() => {
        const fetchCollaborationProfile = async () => {
          try {
            const response = await fetch(`/api/profiles/by-user/${currentUser._id}`);
            const data = await response.json();
    
            // Set hasCollaborationProfile to true if a profile was found
            if (data && data._id) {
              setHasCollaborationProfile(true);
            } else {
              setHasCollaborationProfile(false);
            }
          } catch (error) {
            // Handle error
            setHasCollaborationProfile(false);
          }
        };
    
        if (currentUser) {
          fetchCollaborationProfile();
        }
      }, [currentUser]);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, `profile_images/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setProfileData({ ...profileData, profileImageUrl: url });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            console.error("User must be logged in to update profile");
            return;
        }
    
        // Check if all required fields are filled
        const { fullName, email, institution, description, category, role } = profileData;
        if (!fullName || !email || !institution || !description || !category || !role) {
            // If not, show a toast and stop the form submission
            toast.error('Please fill out all required fields.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
            const updatedProfile = await response.json();
            addOrUpdateProfile(updatedProfile);
            handleCloseForm();
        } catch (error) {
            console.error('Failed to submit profile:', error);
        }
    };
    const handleChange = (event) => {
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
    
    return (
      <div>
        <div className='message-container'>
            <p className='page-message'>It look's like you don't have a collaboration profile. Do you want others to find you and be able to reach out?</p>
        </div>
        <Button className="secondary-button" onClick={handleOpenForm} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Create a profile</Button>
        
    
        <Modal show={showForm} onHide={handleCloseForm} dialogClassName="modal-dialog-centered">
          <Modal.Header closeButton>
            <Modal.Title>Create a Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmit}>
                <div className="form-container row"> 
                    <div className='col-md-6'>
                        <div className="form-group form-box">
                            <label htmlFor="fullName" className="form-label">Full Name<span className='star'>*</span></label>
                            <input 
                                type="text" 
                                className="form-control form-input" 
                                name="fullName" 
                                value={profileData.fullName} 
                                onChange={handleChange} 
                                placeholder="Enter your full name" 
                                required 
                            />
                        </div>
                        <div className="form-group form-box">
                            <label htmlFor="email" className="form-label">Email<span className='star'>*</span></label>
                            <input 
                                type="email" 
                                className="form-control form-input" 
                                name="email" 
                                value={profileData.email} 
                                onChange={handleChange} 
                                placeholder="Enter your email" 
                                required 
                            />
                        </div>
                        <div className="form-group form-box">
                            <label htmlFor="description" className="form-label">Description<span className='star'>*</span></label>
                            <textarea 
                                className="form-control " 
                                name="description" 
                                value={profileData.description} 
                                onChange={handleChange} 
                                rows="6" 
                                maxLength="500" 
                                placeholder="Write a description about what you're looking for, yourself or your ideas!" required></textarea>   
                            <p>{500 - profileData.description.length} characters remaining</p>                     
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group form-box">
                            <label htmlFor="institution" className="form-label">Institution<span className='star'>*</span></label>
                            <select className="form-select form-input" name="institution" value={profileData.institution} onChange={handleChange} required>
                                <option value="">Select an Institution</option>
                                <option value="BI">BI</option>
                                <option value="Oslomet">Oslomet</option>
                                <option value="UiO">UiO</option>
                                <option value="NTNU">NTNU</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group form-box">
                            <label htmlFor="category" className="form-label">Category<span className='star'>*</span></label>
                            <select 
                                className="form-select form-input" 
                                name="category" 
                                value={profileData.category} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="">Select a Category</option> {/* Ensure the user selects an option */}
                                <option value="Academic">Academic</option>
                                <option value="Industry">Industry</option>
                            </select>
                        </div>
                        <div className="form-group form-box">
                            <label htmlFor="role" className="form-label">Role<span className='star'>*</span></label>
                            <select 
                                className="form-select form-input" 
                                name="role" 
                                value={profileData.role} 
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a Role</option> {/* Ensure the user selects an option */}
                                <option value="Student">Student</option>
                                <option value="Group">Group</option>
                            </select>
                        </div>
                        <div className="form-group form-box">
                            <label htmlFor="profileImage form-label">Profile Image</label>
                            <input type="file" className="form-control form-input" onChange={handleImageUpload} />
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center submit-profile-button'>
                    <button type="submit" className="secondary-button">Submit Profile</button>
                </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
}

export default PopupCollabForm;
