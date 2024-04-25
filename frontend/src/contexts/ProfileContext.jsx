import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async (search = '', institution = '', role = '', category = '') => {
        const params = new URLSearchParams({
            ...(search && { search }),
            ...(institution && { institution }),
            ...(role && { role }),
            ...(category && { category })
        });
    
        try {
            const response = await fetch(`/api/profiles/search?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setProfiles(data);
        } catch (error) {
            setError(`Failed to fetch profiles: ${error.toString()}`);
            console.error("Error fetching profiles:", error);
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
