import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useProfiles } from '../contexts/ProfileContext';


export default function CreateProfile() {
    const { addOrUpdateProfile } = useProfiles();
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        institution: '',
        description: '',
        category: '',
        role: ''
    });

    const currentUser = useSelector(state => state.user.currentUser);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            console.error("User must be logged in to update profile");
            return;
        }
        console.log(profileData);  // Check what data is being sent
        try {
            const method = profileData._id ? 'PUT' : 'POST';
            const endpoint = profileData._id ? `/api/profiles/${profileData._id}` : '/api/profiles';
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
        <div className="container page-container">
        <div className="row justify-content-center align-items-center gap-3">
            <div className="col-lg-6 collaboration-container">
                <div className="title-container">
                    <h1 className="page-title collaboration-title">Become more visible!</h1>
                </div>
                <div className="message-container">
                    <p className="page-message">
                        We at SEFiO want to help students find a team or startups finding new members for their team
                    </p>
                </div>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input type="text" className="form-control" name="fullName" value={profileData.fullName} onChange={handleChange} placeholder="Enter your full name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" value={profileData.email} onChange={handleChange} placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="institution" className="form-label">Institution</label>
                            <input type="text" className="form-control" name="institution" value={profileData.institution} onChange={handleChange} placeholder="Enter your institution" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" name="description" value={profileData.description} onChange={handleChange} rows="3" placeholder="Write a description about what you're looking for or tell about yourself and ideas!" required></textarea>                        
                        </div>
                        // In your CreateProfile.jsx component
                        <div className="form-group">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select 
                                className="form-select" 
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
                        <div className="form-group">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select 
                                className="form-select" 
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
                        <div className='button-container'>
                            <button type="submit" className="btn btn-primary btn-submit-profile mt-3">Submit Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}
