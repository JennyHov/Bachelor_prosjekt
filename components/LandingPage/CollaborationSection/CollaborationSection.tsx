import linkedinImage from '../../assets/images/home/linkedin.png';


const CollaborationSection = () => {
  return (
    <div className="container-fluid collaboration-section">
    <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
            <div className="collaboration-info">
                <div className="collaboration-info-inner">
                    <h1 className="collaboration-title">What about collaborating?</h1>
                    <div className="collaboration-description">
                        <p>Explore a pool of students, groups, professors, and find your like-minded individuals ready to collaborate.</p>
                    </div>
                    <div className="collaboration-button">
                        <button className="btn btn-primary">Collaborate</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <img className="collaboration-image" src={linkedinImage} alt="Collaboration Image" />
        </div>
    </div>
  </div>

  )
}

export default CollaborationSection