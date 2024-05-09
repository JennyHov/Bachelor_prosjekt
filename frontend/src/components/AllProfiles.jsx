import React, { useState, useEffect } from 'react';
import { useProfiles } from '../contexts/ProfileContext';
import { useSelector } from 'react-redux';
import '../css/filterBar.css';


const AllProfiles = () => {
    const { profiles, loading, error, removeProfile, fetchProfiles } = useProfiles();
    const currentUser = useSelector((state) => state.user.currentUser);

    const [searchTerm, setSearchTerm] = useState('');
    const [institution, setInstitution] = useState('');
    const [role, setRole] = useState('');
    const [category, setCategory] = useState('');




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
      
      const handleSearch = (event) => {
        if (event.key === 'Enter') {
            fetchProfiles(searchTerm, institution, role, category);
        }
    };
      

    useEffect(() => {
      fetchProfiles(searchTerm, institution, role, category);
  }, [searchTerm, institution, role, category]);

  const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    fetchProfiles(searchTerm, institution, role, category);
  }
};

    return (
        <div className='container'>
          <div className='row justify-content-center'>
            <div className="filter-controls col-md-9 justify-content-center">
                <input
                    type="text"
                    placeholder='Search by name'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleSearch} // Lytt til 'Enter'-tasten
                    className="form-select form-input"
                />
                <select value={institution} onChange={(e) => setInstitution(e.target.value)} className="form-select form-input">
                    <option value="">All Institutions</option>
                    <option value="BI">BI</option>
                    <option value="Oslomet">Oslomet</option>
                    <option value="UiO">UiO</option>
                    <option value="NTNU">NTNU</option>
                    <option value="Other">Other</option> 
                </select>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select form-input">
                    <option value="">All Roles</option>
                    <option value="Student">Student</option>
                    <option value="Group">Group</option>
                </select>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select form-input">
                    <option value="">All Categories</option>
                    <option value="Academic">Academic</option>
                    <option value="Industry">Industry</option>
                </select>
            </div>
          </div>
          


          {loading && <div>Loading profiles...</div>}
          {error && <div>Error loading profiles: {error}</div>}

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
                  </div>
              ))}
          </div>
      </div>
    );
};

export default AllProfiles;
