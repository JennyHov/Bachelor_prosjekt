const ContactSection = () => {
  return (
    <div className="container contact-section">
    <div className="row justify-content-center align-items-center">
        <div className="col-md-4 contact-item">
            <img className="contact-image" src="https://via.placeholder.com/245x245" alt="Contact Image" />
            <div className="contact-details">
                <span className="contact-name">Magnus Svendsen</span>
                <span className="contact-role">CEO</span>
                <span className="contact-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></span>
            </div>
        </div>
        <div className="col-md-4 contact-item">
            <img className="contact-image" src="https://via.placeholder.com/245x245" alt="Contact Image" />
            <div className="contact-details">
                <span className="contact-name">Hanna Worum</span>
                <span className="contact-role">Chief of Board</span>
                <span className="contact-email"><a href="mailto:Hanna.worum@sefio.no">Hanna.worum@sefio.no</a></span>
            </div>
        </div>
        <div className="col-md-4 contact-item">
            <img className="contact-image" src="https://via.placeholder.com/245x245" alt="Contact Image" />
            <div className="contact-details">
                <span className="contact-name">Henrik Mørk</span>
                <span className="contact-role">CFO</span>
                <span className="contact-email"><a href="mailto:henrik.mork@sefio.no">henrik.mork@sefio.no</a></span>
            </div>
        </div>
    </div>
    <div className="row justify-content-center align-items-center">
        <div className="col-md-4 contact-item">
            <img className="contact-image" src="https://via.placeholder.com/245x245" alt="Contact Image" />
            <div className="contact-details">
                <span className="contact-name">Johan Sandbu</span>
                <span className="contact-role">Board Representative - Høyskolen Kristiania</span>
                <span className="contact-email"><a href="mailto:Johan.sandbu@sefio.no">Johan.sandbu@sefio.no</a></span>
            </div>
        </div>
        <div className="col-md-4 contact-item">
            <img className="contact-image" src="https://via.placeholder.com/245x245" alt="Contact Image" />
            <div className="contact-details">
                <span className="contact-name">Elisabeth Alvern</span>
                <span className="contact-role">Board Representative - NMBU</span>
                <span className="contact-email"><a href="mailto:Hanna.worum@sefio.no">Hanna.worum@sefio.no</a></span>
            </div>
        </div>
        <div className="col-md-4 contact-item">
            <img className="contact-image" src="https://via.placeholder.com/245x245" alt="Contact Image" />
            <div className="contact-details">
                <span className="contact-name">Arnar Reiten</span>
                <span className="contact-role">Board Representative - UIO</span>
                <span className="contact-email"><a href="mailto:Arnar.reiten@sefio.no">Arnar.reiten@sefio.no</a></span>
            </div>
        </div>
    </div>
  </div>

  )
}

export default ContactSection