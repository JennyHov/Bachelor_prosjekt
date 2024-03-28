import whoAreWeImage from '../../../../assets/images/home/who_are_we.png';
import 'bootstrap/dist/css/bootstrap.min.css';


const WhoAreWeSection = () => {
  return (
    <div className="container-fluid who-are-we-section">
        <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
                <img className="who-are-we-image" src={whoAreWeImage} alt="Placeholder Image" />
            </div>
            <div className="col-md-6">
                <div className="who-are-we-info">
                    <h1 className="who-are-we-title">Who are we?</h1>
                        <div className="who-are-we-description">
                            <p>The student’s Entrepreneurship Fund in Oslo (SEFiO) is by and for students in Oslo. Together with Oslo’s five major educational institutions, the municipality, partners and sponsor Aneo - SEFiO provides activities and learnings for any student interested in starting their innovation journey.</p>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WhoAreWeSection