import '../../css/Dashboard.css';
import React, { useState, useEffect } from 'react';


const Dashboard = () => {
    const [activeView, setActiveView] = useState('Home');
    const [showSidebar, setShowSidebar] = useState(false);  // Tilstand for å vise/skjule sidebar
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');


    const handleViewChange = (view) => {
        setActiveView(view);
        setShowSidebar(false);  // Lukk sidebar når et element er valgt
    };

    useEffect(() => {
      fetch('/api/admin/users', {
          method: 'GET',
          credentials: 'include', // Nødvendig for å sende cookies med forespørselen
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch');
          }
          return response.json();
      })
      .then(data => {
          setUsers(data);
      })
      .catch(error => {
          setError('Failed to fetch users');
          console.error('Error fetching users', error);
      });
  }, []);

  const changeUserRole = (userId, newRole) => {
    fetch('/api/admin/users/role', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, role: newRole })
    })
    .then(response => response.json())
    .then(data => {
        setUsers(users.map(user => user._id === userId ? { ...user, role: data.role } : user));
    })
    .catch(error => {
        console.error('Error updating user role', error);
    });
  };

    return (
        <div className='container page-container'>
            <div className="dashboard-container">
                <button className="sidebar-toggle" onClick={() => setShowSidebar(!showSidebar)}>
                    Menu
                </button>
                <div className={`sidebar ${showSidebar ? 'visible' : ''}`}>
                    <button onClick={() => handleViewChange('Home')}>Home</button>
                    <button onClick={() => handleViewChange('Users')}>Users</button>
                    <button onClick={() => handleViewChange('Counter')}>Counter</button>
                </div>
                <div className="main-content">
                    {activeView === 'Home' && 
                    <div>
                      <h1>Admin Dashboard</h1>            
                    </div>}
                    {activeView === 'Users' && (
                        <div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.fullName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => changeUserRole(user._id, user.role === 'admin' ? 'user' : 'admin')}>
                                                    Change to {user.role === 'admin' ? 'User' : 'Admin'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeView === 'Counter' && <div><p>Interactive Counter:</p><Counter /></div>}
                </div>
            </div>
        </div>
    );
};

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <p>Current Count: {count}</p>
        </div>
    );
};

export default Dashboard;
