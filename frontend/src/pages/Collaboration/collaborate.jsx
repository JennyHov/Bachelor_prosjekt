import React from 'react';
import TogglePopup from '../../components/TogglePopup';

import '../../css/collaborate.css';
import AllProfiles from '../../components/AllProfiles';

export default function Collaborate() {
  return (
    <main>
      <div style={{ height: '70px' }}></div>
      <section>
        <TogglePopup />
      </section>
      <section>
        <AllProfiles />
      </section>
    </main>
  );  
}
