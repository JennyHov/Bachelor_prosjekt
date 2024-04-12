
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Users from './pages/Users';

import Footer from './pages/Shared/Footer';
import Header from './pages/Shared/Header';
import SubmitApplication from './pages/SubmitApplication/submit_application';
import Criteria from './pages/CriteriaPage/criteria';
import UserProfileInformation from './pages/Profile/userprofile_information';
import Collaborate from './pages/Collaboration/collaborate';
import Home from './pages/LandingPage/home';
import Counseling from './pages/CounselingApplication/counseling';
import Thankyou from './pages/ThankYou/thank_you';
import AboutUs from './pages/AboutUs/about_us';
import ContactUs from './pages/ContactUs/contact_us';
import Events from './pages/Events/events';

import React, { useState } from 'react';

function App() {

  return (
    <BrowserRouter>
    
      <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/thankyou" element={<Thankyou/>} />
          <Route path="/counseling" element={<Counseling/>} />
          <Route path="/collaborate" element={<Collaborate/>} />
          <Route path="/userprofile" element={<UserProfileInformation/>} />
          <Route path="/criteria" element={<Criteria/>} /> 
          <Route path="/submit-application" element={<SubmitApplication />} /> 
          <Route path="/events" element={<Events />} />

          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route element={<PrivateRoute />} >
            <Route path="/user-profile" element={<Profile />} />
          </Route>
          <Route element={<PrivateRoute requireAdmin={true} />}>
            <Route path="/users" element={<Users />} />
          </Route> 

        </Routes>
        <Footer />

    </BrowserRouter>
  );
}

export default App;

{/* 

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<PrivateRoute />} >
          <Route path="/user-profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute requireAdmin={true} />}>
          <Route path="/users" element={<Users />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

*/}