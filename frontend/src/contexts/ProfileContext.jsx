import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const response = await fetch('/api/profiles/profiles');
            const data = await response.json();
            if (response.ok) {
                setProfiles(data);
            } else {
                throw new Error('Unable to fetch profiles');
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching profiles:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const addOrUpdateProfile = (profile) => {
        const index = profiles.findIndex(p => p._id === profile._id);
        if (index > -1) {
            const updatedProfiles = [...profiles];
            updatedProfiles[index] = profile;
            setProfiles(updatedProfiles);
        } else {
            setProfiles(prev => [...prev, profile]);
        }
    };
    const removeProfile = (profileId) => {
        setProfiles(prevProfiles => prevProfiles.filter(profile => profile._id !== profileId));
      };
      

    return (
        <ProfileContext.Provider value={{ profiles, loading, error, addOrUpdateProfile, fetchProfiles, removeProfile }}>
            {children}
        </ProfileContext.Provider>

    );
};

export const useProfiles = () => useContext(ProfileContext);
