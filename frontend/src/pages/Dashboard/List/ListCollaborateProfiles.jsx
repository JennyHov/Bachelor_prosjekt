import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ListCollaborateProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState('');
    const [editProfileData, setEditProfileData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState({});
    const [searchQuery, setSearchQuery] = useState('');  // State for search query


    const toggleDescription = (id) => {
        setShowFullDescription(prev => ({
            ...prev,
            [id]: !prev[id]  // Toggle the state for specific profile
        }));
    };
        

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = () => {
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
    };

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

    const openEditModal = (profile) => {
        setEditProfileData(profile);
        setShowEditModal(true);
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        fetch(`/api/admin/collaborate-profiles/${editProfileData._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editProfileData),
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            return response.json();
        })
        .then(updatedProfile => {
            setProfiles(profiles.map(profile => profile._id === updatedProfile._id ? updatedProfile : profile));
            setShowEditModal(false);
            toast.success('Profile updated successfully');
        })
        .catch(error => {
            console.error('Failed to update profile', error);
            toast.error('Failed to update profile');
        });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProfiles = profiles.filter(profile =>
        profile.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Collaborative Profiles</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-control mb-3"
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th>Institution</th>
                        <th>Category</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {filteredProfiles.map(profile => (
                        <tr key={profile._id}>
                            <td>{profile.fullName}</td>
                            <td>{profile.email}</td>
                            <td>
                                {showFullDescription[profile._id] ? (
                                    <span>
                                        {profile.description}
                                        <Button variant="link" size="sm" onClick={() => toggleDescription(profile._id)}>
                                            Read less
                                        </Button>
                                    </span>
                                ) : (
                                    <span>
                                        {profile.description.substring(0, 15)}...
                                        <Button variant="link" size="sm" onClick={() => toggleDescription(profile._id)}>
                                            Read more
                                        </Button>
                                    </span>
                                )}
                            </td>
                            <td>{profile.institution}</td>
                            <td>{profile.category}</td>
                            <td>{profile.role}</td>
                            <td>
                                <ButtonGroup>
                                    <Button className="btn btn-primary me-2" onClick={() => openEditModal(profile)}>
                                        Edit
                                    </Button>
                                    <Button className="btn btn-danger" onClick={() => deleteProfile(profile._id)}>
                                        Delete
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={editProfileData?.fullName || ''}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={editProfileData?.email || ''}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={editProfileData?.description || ''}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Institution</Form.Label>
                            <Form.Control
                                as="select"
                                name="institution"
                                value={editProfileData?.institution || ''}
                                onChange={handleEditChange}
                                required
                            >
                                <option value="BI">BI</option>
                                <option value="Oslomet">Oslomet</option>
                                <option value="UiO">UiO</option>
                                <option value="NTNU">NTNU</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                value={editProfileData?.category || ''}
                                onChange={handleEditChange}
                                required
                            >
                                <option value="Academic">Academic</option>
                                <option value="Industry">Industry</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={editProfileData?.role || ''}
                                onChange={handleEditChange}
                                required
                            >
                                <option value="Student">Student</option>
                                <option value="Group">Group</option>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" className="mt-3">Save Changes</Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default ListCollaborateProfiles;
