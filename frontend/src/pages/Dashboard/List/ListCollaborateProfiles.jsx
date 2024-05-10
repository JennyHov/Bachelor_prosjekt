
import React, { useState, useEffect } from 'react';

const ListCollaborateProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/collaborate-profiles', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch collaborative profiles');
            }
            return response.json();
        })
        .then(data => {
            setProfiles(data);
        })
        .catch(error => {
            console.error('Error fetching collaborative profiles', error);
            setError('Failed to fetch collaborative profiles');
        });
    }, []); // Dependency array is empty as fetchUrl is not a dependency

    const deleteProfile = (profileId) => {
        fetch(`/api/admin/collaborate-profiles/${profileId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete profile');
            }
            return response.json();
        })
        .then(() => {
            setProfiles(profiles.filter(profile => profile._id !== profileId));
        })
        .catch(error => {
            console.error('Error deleting profile', error);
            setError('Failed to delete profile');
        });
    };

    return (
        <div>
            <h2>Collaborative Profiles</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th>Institution</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map(profile => (
                        <tr key={profile._id}>
                            <td>{profile.fullName}</td>
                            <td>{profile.email}</td>
                            <td>{profile.description}</td>
                            <td>{profile.institution}</td>
                            <td>{profile.category}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteProfile(profile._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListCollaborateProfiles;

