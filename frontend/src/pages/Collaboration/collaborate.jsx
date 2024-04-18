// pages/Collaboration/collaborate.jsx
import React from 'react';
import CreateProfile from '../../components/CreateProfile';  // Ensure the path is correct based on your directory structure

import '../../css/collaborate.css';
import AllProfiles from '../../components/AllProfiles';

export default function Collaborate() {
  return (
    <div>
      <CreateProfile />
      <AllProfiles />
    </div>
  );
}
