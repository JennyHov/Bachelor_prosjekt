import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/*
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
*/

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



export default function App() {
  return (
    <BrowserRouter>
      <Header />

        <Routes>
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/thankyou" element={<Thankyou/>} />
          <Route path="/counseling" element={<Counseling/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/collaborate" element={<Collaborate/>} />
          <Route path="/userprofile" element={<UserProfileInformation/>} />
          <Route path="/criteria" element={<Criteria/>} /> 
          <Route path="/submit-application" element={<SubmitApplication />} /> 
        </Routes>

        <Footer />
    </BrowserRouter>
  )
}
