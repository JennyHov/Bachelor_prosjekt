import React from 'react';
import TogglePopup from '../../components/TogglePopup';

import '../../css/collaborate.css';
import AllProfiles from '../../components/AllProfiles';

export default function Collaborate() {
  return (
    <div>
      <div style={{ height: '70px' }} />
      <TogglePopup />
      <AllProfiles />
    </div>
  );
}
