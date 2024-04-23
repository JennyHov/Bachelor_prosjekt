import React from 'react';
import { useProfiles } from '../contexts/ProfileContext';
import { useSelector } from 'react-redux';


const AllProfiles = () => {
    const { profiles, loading, error, removeProfile } = useProfiles();
    const currentUser = useSelector((state) => state.user.currentUser);


    if (loading) return <div>Loading profiles...</div>;
    if (error) return <div>Error loading profiles: {error}</div>;


    const deleteProfileHandler = async (profileId) => {
        if (window.confirm('Are you sure you want to delete this profile?')) {
          try {
            const response = await fetch(`/api/profiles/${profileId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                // Legg til token i Authorization-header om nødvendig
              },
              credentials: 'include', // eller 'same-origin' hvis API-et ditt bruker cookies
            });
      
            if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
            }
      
            const data = await response.json();
            alert(data.message); // Viser meldingen fra backend
            removeProfile(profileId); // Oppdaterer tilstanden etter sletting
          } catch (error) {
            console.error('Failed to delete the profile:', error);
            alert('Failed to delete the profile');
          }
        }
      };
      

    return (
        <div className='container'>
            <div className="row profile-row">
                {profiles.map(profile => (
                    <div key={profile._id} className="col-md-3 coprofile">
                        <div className="coprof-image-content">
                            <div className="coprofile-image">
                            <img className="coprofile-img" src={profile.profileImageUrl || 'https://example.com/path/to/default-profile-image.jpg'} alt="Profile" />
                            </div>
                        </div>
                        <div className="coprofile-content">
                            <p className="coprofile-name">{profile.fullName}</p>
                            <hr className="name-divider" />
                            <p className="coprofile-category">{profile.category}</p>
                            <p className="coprofile-description">{profile.description}</p>
                            <p className="coprofile-email"><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
                        </div>
                        {currentUser && (currentUser._id === profile.user._id || currentUser.role === 'admin') && (
                        <button
                            onClick={() => deleteProfileHandler(profile._id)}
                            className="delete-profile-button"
                        >
                            Delete Profile
                        </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProfiles;
