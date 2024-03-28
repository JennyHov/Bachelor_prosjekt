import instagramImage from '../../../../assets/images/home/instagram.png';
import facebookImage from '../../../../assets/images/home/facebook.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const SocialMediaSection = () => {
  return (
    <div className="container social-section">
    <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
            <div className="mission-statement">
                <p>With a mission to empower 70,000 students across five member institutions, we're expanding our network to ensure more points of contact. Stay connected with us on social media for the latest updates and opportunities to kickstart your entrepreneurial dreams!</p>
            </div>
        </div>
        <div className="col-md-6">
            <div className="social-icons">
                <div className="social-icon">
                    {/* <img src="https://via.placeholder.com/71x71" alt="Social Media Icon" /> */}
                </div>
                <div className="social-icon">
                    <img src={instagramImage} alt="Social Media Icon" />
                </div>
                <div className="social-icon">
                    <img src={facebookImage} alt="Social Media Icon" />
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}

export default SocialMediaSection