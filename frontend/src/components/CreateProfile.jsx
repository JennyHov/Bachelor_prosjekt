import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Ensure you are importing useSelector

export default function CreateProfile() {
    const currentUser = useSelector(state => state.user.currentUser); // Accessing currentUser from Redux
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        institution: '',
        description: '',
        category: 'Academic',
        role: 'Student'
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Check if currentUser exists and has an id
        if (currentUser && currentUser.id) {
            const fetchCurrentUserProfile = async () => {
                try {
                    const response = await fetch(`/api/profiles/by-user/${currentUser.id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setFormData(data);
                        setIsEditing(true); // Set to true if profile exists, i.e., we're editing
                    }
                } catch (error) {
                    console.error("Failed to fetch profile:", error);
                }
            };
            fetchCurrentUserProfile();
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `/api/profiles/${formData._id}` : '/api/profiles';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data);
    };

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
                        <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="institution" className="form-label">Institution</label>
                        <input type="text" className="form-control" name="institution" value={formData.institution} onChange={handleChange} placeholder="Enter your institution" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Write a description about what you're looking for or tell about yourself and ideas!" required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select" name="category" value={formData.category} onChange={handleChange} placeholder="Choose a category">
                            <option value="Academic">Academic</option>
                            <option value="Industry">Industry</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
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
};
