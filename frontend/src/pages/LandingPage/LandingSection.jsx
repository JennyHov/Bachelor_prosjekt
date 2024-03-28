import rocketImage from '../../../../assets/images/home/rocket.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const LandingSection = () => {
  return (
    <div className="container-fluid landing-section">
    <div className="row justify-content-center align-items-center">
        <div className="col-md-6 landing-image">
            <img src={rocketImage} alt="Landing Image" className="img-fluid"/>
        </div>
        <div className="col-md-6 landing-content">
            <div className="landing-content-inner">
                <h1 className="landing-title">25.000NOK for your idea?</h1>
                <p className="landing-description">SEFiO supports your student startup with funding up to 25,000NOK!</p>
                <div className="landing-button">
                    <Link to="/submit-application" className="btn btn-primary">Submit application</Link>
                </div>
                <div className="landing-links">
                    <p className="landing-link-description">Unsure about what it takes?</p>
                    <p className="landing-link"><a href="#" className="text-decoration-none text-uppercase text-primary">Read our criteria</a></p>
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}

export default LandingSection