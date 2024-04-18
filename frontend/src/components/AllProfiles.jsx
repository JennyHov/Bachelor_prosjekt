import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // To access currentUser

const AllProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUser = useSelector(state => state.user.currentUser); // Accessing currentUser from Redux

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('/api/profiles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProfiles(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const handleDelete = async (profileId) => {
        if (window.confirm("Are you sure you want to delete this profile?")) {
            const response = await fetch(`/api/profiles/${profileId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setProfiles(profiles.filter(profile => profile._id !== profileId));
            } else {
                alert("Failed to delete the profile.");
            }
        }
    };

    if (loading) return <div>Loading profiles...</div>;
if (error) return <div>Error loading profiles: {error}</div>;


    return (
        <div className='container'>
            <div className="row profile-row">
                {profiles.map(profile => (
                    <div key={profile._id} className="col-md-3 coprofile">
                        <div className="coprof-image-content">
                            <div className="coprofile-image">
                                <img className="coprofile-img" src={profile.imageUrl || 'defaultImagePath.jpg'} alt="Profile" />
                            </div>
                        </div>
                        <div className="coprofile-content">
                            <p className="coprofile-name">{profile.fullName}</p>
                            <hr className="name-divider" />
                            <p className="coprofile-category">{profile.category}</p>
                            <p className="coprofile-description">{profile.description}</p>
                            <p className="coprofile-email"><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
                            {(currentUser && (currentUser._id === profile.user.toString() || currentUser.role === 'admin')) && (
                                <button onClick={() => handleDelete(profile._id)}>Delete</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProfiles;
