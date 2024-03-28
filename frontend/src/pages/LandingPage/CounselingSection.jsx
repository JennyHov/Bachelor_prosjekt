import counselingImage from '../../../../assets/images/home/counselling.png'; // Juster denne stien etter din filstruktur
import 'bootstrap/dist/css/bootstrap.min.css';

const CounselingSection = () => {
  return (
    <div className="container-fluid counseling-section">
    <div className="row justify-content-center align-items-center">
        <div className="col-md-6 counseling-content">
            <div className="counseling-content-inner">
                <h1 className="counseling-title">We offer free counseling</h1>
                <p className="counseling-description">Our free counseling offers personalized advice from our team, helping you navigate, refine and elevate your ideas.</p>
                <div className="counseling-button">
                    <button className="btn btn-primary">Apply for counseling</button>
                </div>
            </div>
        </div>
        <div className="col-md-6 justify-content-end align-items-center d-flex">
            <img src={counselingImage} alt="Counseling Image" className="img-fluid" />
        </div>
    </div>
  </div>
  )
}

export default CounselingSection