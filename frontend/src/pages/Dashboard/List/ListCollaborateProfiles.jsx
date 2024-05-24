import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ListCollaborateProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState('');
    const [editProfileData, setEditProfileData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState({});
    const [searchQuery, setSearchQuery] = useState(''); 


    const toggleDescription = (id) => {
        setShowFullDescription(prev => ({
            ...prev,
            [id]: !prev[id]  // for togglingen 
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
            <section>
                <header>
                    <h2>Collaborative Profiles</h2>
                </header>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form>
                    <label htmlFor="searchQuery" className="visually-hidden">Search by name</label>
                    <input
                    id="searchQuery"
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control mb-3"
                    />
                </form>
                <table className="table" role="grid">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Description</th>
                        <th scope="col">Institution</th>
                        <th scope="col">Category</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
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
                                <button type="button" className="btn btn-link btn-sm" onClick={() => toggleDescription(profile._id)}>
                                Read less
                                </button>
                            </span>
                            ) : (
                            <span>
                                {profile.description.substring(0, 15)}...
                                <button type="button" className="btn btn-link btn-sm" onClick={() => toggleDescription(profile._id)}>
                                Read more
                                </button>
                            </span>
                            )}
                        </td>
                        <td>{profile.institution}</td>
                        <td>{profile.category}</td>
                        <td>{profile.role}</td>
                        <td>
                            <div role="group" aria-label={`Actions for ${profile.fullName}`}>
                            <button type="button" className="btn btn-primary me-2" onClick={() => openEditModal(profile)}>
                                Edit
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => deleteProfile(profile._id)}>
                                Delete
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

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
