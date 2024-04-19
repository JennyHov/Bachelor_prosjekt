// pages/Collaboration/collaborate.jsx
import React from 'react';
import CreateProfile from '../../components/CreateProfile';  // Ensure the path is correct based on your directory structure

import '../../css/collaborate.css';
import AllProfiles from '../../components/AllProfiles';

export default function Collaborate() {
  return (
    <div>
      <div style={{ height: '70px' }} />
      <CreateProfile />
      {/* Card filtering*/}
      <div className='form-group filter'>

        <input type="text" placeholder='Search by keyword' />
        <select name="Role" className='select'>
          <option value="Role">Role</option>
          <option value="IT">IT</option>
          <option value="Engineer">Engineer</option>
        </select>

        <select name="Category" className='select'>
        <option value="category">Category</option>
          <option value="test1">test1</option>
          <option value="test2">test2</option>
        </select>
        <select name="Institution" className='select'>
        <option value="institution">Institution</option>
          <option value="Oslomet">Oslomet</option>
          <option value="UiO">UiO</option>
          <option value="BI">BI</option>
        </select>
      </div>
      <AllProfiles />
    </div>
  );
}
