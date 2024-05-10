
import '../../css/Dashboard.css';
import React, { useState, useEffect } from 'react';
import ListProfiles from './List/ListProfiles';
import ListCollaborateProfiles from './List/ListCollaborateProfiles';
import CountDown from './CountDown/CountDown';


const Dashboard = () => {
    const [activeView, setActiveView] = useState('Home');
    const [showSidebar, setShowSidebar] = useState(false);  // Tilstand for å vise/skjule sidebar
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    const handleViewChange = (view) => {
        setActiveView(view);
        setShowSidebar(false);  // Lukk sidebar når et element er valgt
    };

        // Part of Dashboard.jsx within the Dashboard component

        const fetchCollaborateProfiles = () => {
            fetch('/api/admin/collaborate-profiles', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch collaborate profiles');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);  // Assuming 'users' state is used to store profiles here
            })
            .catch(error => {
                console.error('Error fetching collaborate profiles', error);
                setError('Failed to fetch collaborate profiles');
            });
        };


    useEffect(() => {
        if (activeView === 'Collaborate Profiles') {
            fetchCollaborateProfiles();
        }
    }, [activeView]); 


    return (
        <div className='container page-container'>
            <div className="dashboard-container">
                <button className="sidebar-toggle" onClick={() => setShowSidebar(!showSidebar)}>
                    Menu
                </button>
                <div className={`sidebar ${showSidebar ? 'visible' : ''}`}>
                    <button onClick={() => handleViewChange('Home')}>Home</button>
                    <button onClick={() => handleViewChange('Profiles')}>Profiles</button>
                    <button onClick={() => handleViewChange('Collaborate Profiles')}>Collaborate Profiles</button>
                    <button onClick={() => handleViewChange('Counter')}>Counter</button>
                </div>
                <div className="main-content">
                    {activeView === 'Home' && 
                    <div><h1>Admin Dashboard</h1></div>}
                    {activeView === 'Profiles' && (
                        <div>
                            <ListProfiles />
                        </div>
                    )}
                    {activeView === 'Collaborate Profiles' && (
                        <div>
                            <ListCollaborateProfiles />

                        </div>
                    )}
                    {activeView === 'Counter' && <div><CountDown /></div>}
                </div>
            </div>
        </div>
    );
};


export default Dashboard;
