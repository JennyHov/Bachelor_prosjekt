import React from 'react';
import { useProfiles } from '../contexts/ProfileContext';

const AllProfiles = () => {
    const { profiles, loading, error } = useProfiles();

    if (loading) return <div>Loading profiles...</div>;
    if (error) return <div>Error loading profiles: {error}</div>;

    return (
        <div className='container'>
            <div className="row profile-row">
                {profiles.map(profile => (
                    <div key={profile._id} className="col-md-3 coprofile">
                        <div className="coprof-image-content">
                            <div className="coprofile-image">
                            <img className="coprofile-img" src={profile.profileImage || 'https://example.com/path/to/default-profile-image.jpg'} alt="Profile" />
                            </div>
                        </div>
                        <div className="coprofile-content">
                            <p className="coprofile-name">{profile.fullName}</p>
                            <hr className="name-divider" />
                            <p className="coprofile-category">{profile.category}</p>
                            <p className="coprofile-description">{profile.description}</p>
                            <p className="coprofile-email"><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProfiles;
