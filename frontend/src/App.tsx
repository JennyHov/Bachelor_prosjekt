import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import CollaborationSection from './components/CollaborationSection/CollaborationSection'
import ContactSection from './components/ContactSection/ContactSection'
import CounselingSection from './components/CounselingSection/CounselingSection'
import EventsSection from './components/EventsSection/EventsSection'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import LandingSection from './components/LandingSection/LandingSection'
import SocialMediaSection from './components/SocialMediaSection/SocialMediaSection'
import WhoAreWeSection from './components/WhoAreWeSection/WhoAreWeSection'
import YoutubeVideos from './components/YoutubeVideos/YoutubeVideos'

function App() {
  return (
    <>
      <Header />
      <LandingSection />
      <CounselingSection />
      <EventsSection />
      <CollaborationSection />
      <WhoAreWeSection />
      <ContactSection />
      <SocialMediaSection />
      <YoutubeVideos />
      <Footer />
    </>
  )
}

export default App
