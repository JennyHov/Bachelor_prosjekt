import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { ProfileProvider } from './contexts/ProfileContext'; 

import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard/Dashboard';

import Footer from './pages/Shared/Footer';
import Header from './pages/Shared/Header';
import SubmitApplication from './pages/SubmitApplication/submit_application';
import Process from './pages/ProcessPage/process';
import UserProfileInformation from './pages/Profile/userprofile_information';
import Collaborate from './pages/Collaboration/collaborate';
import Home from './pages/LandingPage/home';
import Counseling from './pages/CounselingApplication/counseling';
import Thankyou from './pages/ThankYou/thank_you';
import AboutUs from './pages/AboutUs/about_us';
import ContactUs from './pages/ContactUs/contact_us';
import Events from './pages/Events/events';
import CreateProfile from './components/CreateProfile';
import AllProfiles from './components/AllProfiles';
import React, { useState } from 'react';


import ScrollToTop from './Hooks/ScrollToTop';

function App() {

  return (
    <BrowserRouter>
    
    <ScrollToTop />
      <ProfileProvider>
      <Header />
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/thankyou" element={<Thankyou/>} />
        <Route path="/counseling" element={<Counseling/>} />
        <Route path="/collaborate" element={<Collaborate/>} />
        <Route path="/userprofile" element={<UserProfileInformation/>} />
        <Route path="/process" element={<Process/>} /> 
        <Route path="/submit-application" element={<SubmitApplication />} /> 
        <Route path="/events" element={<Events />} />

        <Route path="/create-profile" element={<CreateProfile />} />

        <Route path="/profiles" element={<AllProfiles />} />

        <Route path="/events/:eventId" element={<Events />} />

        <Route path="/create-profile" element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
        <Route path="/profiles" element={<PrivateRoute><AllProfiles /></PrivateRoute>} />
        <Route path="/collaborate" element={<PrivateRoute><Collaborate /></PrivateRoute>} />
        <Route path="/userprofile" element={<PrivateRoute><UserProfileInformation /></PrivateRoute>} />
        <Route path="/user-profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute requireAdmin={true}><Dashboard /></PrivateRoute>} />
        </Routes>
        <Footer />
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;