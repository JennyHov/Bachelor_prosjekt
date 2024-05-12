import React, { useState } from 'react';
import CreateProfile from './CreateProfile';
import AuthPopup from '../pages/AuthPopup';

const TogglePopup = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

  return (
    <div>
      <CreateProfile togglePopup={togglePopup} isPopupOpen={isPopupOpen} />
      <AuthPopup isOpen={isPopupOpen} onClose={togglePopup} /> 
      {isPopupOpen && <div className='overlay'></div>}
    </div>
  );
};

export default TogglePopup;