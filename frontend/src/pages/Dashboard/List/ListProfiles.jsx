
import React, { useState, useEffect } from 'react';

const ListProfiles = ({ fetchUrl }) => {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        fetch('/api/admin/users', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch profiles');
            }
            return response.json();
        })
        .then(data => {
            setProfiles(data);
        })
        .catch(error => {
            console.error('Error fetching profiles', error);
            setError('Failed to fetch profiles');
        });
    }, []); 

    // Change user role
    const changeUserRole = (userId, newRole) => {
        const updatedRole = newRole === 'admin' ? 'user' : 'admin';
        fetch(`/api/admin/users/role`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ userId, role: updatedRole })
        })
        .then(response => response.json())
        .then(() => {
            setProfiles(profiles.map(profile => 
                profile._id === userId ? { ...profile, role: updatedRole } : profile
            ));
        })
        .catch(error => {
            console.error('Error updating user role', error);
            setError('Error updating role');
        });
    };

    // Delete user
    const deleteUser = (userId) => {
        fetch(`/api/admin/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            return response.json();
        })
        .then(() => {
            setProfiles(profiles.filter(profile => profile._id !== userId));
        })
        .catch(error => {
            console.error('Error deleting user', error);
            setError('Failed to delete user');
        });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to filter profiles based on search query
    const filteredProfiles = profiles.filter(profile => 
        profile.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Profiles</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-control mb-3"
            />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProfiles.map(profile => (
                        <tr key={profile._id}>
                            <td>{profile.fullName}</td>
                            <td>{profile.email}</td>
                            <td>{profile.role}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => changeUserRole(profile._id, profile.role)}>
                                    Change to {profile.role === 'admin' ? 'User' : 'Admin'}
                                </button>
                                <button className="btn btn-danger" onClick={() => deleteUser(profile._id)}>
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

export default ListProfiles;


