import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PopupCollabForm from './popupCollabForm';
import { Link } from 'react-router-dom';

export default function CreateProfile({ togglePopup }) {
    const currentUser = useSelector(state => state.user.currentUser);
    const [hasCollaborationProfile, setHasCollaborationProfile] = useState(false);
    
    useEffect(() => {
        const fetchCollaborationProfile = async () => {
          try {
            const response = await fetch(`/api/profiles/by-user/${currentUser._id}`);
            const data = await response.json();
    
            if (data && data._id) {
              setHasCollaborationProfile(true);
            } else {
              setHasCollaborationProfile(false);
            }
          } catch (error) {
            setHasCollaborationProfile(false);
          }
        };
    
        if (currentUser) {
          fetchCollaborationProfile();
        }
    }, [currentUser]);
    
    return (
        <div className="container page-container">
        <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 justify-content-center">
                <div className="title-container">
                    <h1 className="page-title">Become more visible!</h1>
                </div>
                {currentUser ? (
                    <>
                        <div className="message-container">
                            <p className="page-message">
                                We at SEFiO want to help students find a team, startups, or new members for their team.
                            </p>
                        </div>
                        {hasCollaborationProfile ? (
                            <div className='message-container'>
                                <p className='page-message'>You already have a collaboration profile.</p>
                                <p className="page-message">If you want to update it you can do so in
                                    <span className="landing-link">
                                        <Link to="/userprofile" className="text-primary"> my profile.</Link>
                                    </span>
                                </p>
                            </div>
                        ) : (
                        <PopupCollabForm/>
                        )}
                    </>
                ) : (
                    <>
                    <div className="message-container">
                        <p className="page-message">
                            We at SEFiO want to help students find a team, startups, or new members for their team.
                        </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="alert alert-warning custom-alert" role="alert">
                            You must be <span onClick={togglePopup} className='alert-link custom-alert-link'>logged in</span> to create or update your profile.
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    </div>
    );
}