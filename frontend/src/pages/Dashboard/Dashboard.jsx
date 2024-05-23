
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
            <button className="sidebar-toggle" aria-controls="sidebar" aria-expanded={showSidebar} onClick={() => setShowSidebar(!showSidebar)}>
              Menu
            </button>
            <nav id="sidebar" className={`sidebar ${showSidebar ? 'visible' : ''}`} aria-label="Main navigation">
              <ul>
                <li><button onClick={() => handleViewChange('Home')}>Home</button></li>
                <li><button onClick={() => handleViewChange('Profiles')}>Profiles</button></li>
                <li><button onClick={() => handleViewChange('Collaborate Profiles')}>Collaborate Profiles</button></li>
                <li><button onClick={() => handleViewChange('Counter')}>Counter</button></li>
              </ul>
            </nav>
            <main className="main-content">
              {activeView === 'Home' && (
                <section>
                  <header>
                    <h1>Admin Dashboard</h1>
                  </header>
                </section>
              )}
              {activeView === 'Profiles' && (
                <section>
                  <ListProfiles />
                </section>
              )}
              {activeView === 'Collaborate Profiles' && (
                <section>
                  <ListCollaborateProfiles />
                </section>
              )}
              {activeView === 'Counter' && (
                <section>
                  <CountDown />
                </section>
              )}
            </main>
          </div>
        </div>
      );
      
};


export default Dashboard;
