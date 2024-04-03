import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/submit_application.css';

import henrikImage from '../../../../assets/images/home/henrik.png';
import hannaImage from '../../../../assets/images/home/hanna.png';
import magnusImage from '../../../../assets/images/home/magnus.png';
import johanImage from '../../../../assets/images/home/johan.png';
import elisabethImage from '../../../../assets/images/home/elisabeth.png';
import arnarImage from '../../../../assets/images/home/arnar.png';

export default function AboutUs () {
    return (
        <div className='container'>
            <div className='row justify-content-center align-items-center gap-3'>
                <div className='col-lg-6 about-us-container'>
                    <div className="title-container">
                        <h1 className="about-us-title">About Us</h1>
                    </div>
                    <div className="message-container">
                        <p className="about-us-message">
                            SEFiO is on a mission for 70,000 students spread across five member institutions – that means more points of contact! No matter who you reach out to, we can guarantee one thing – we are here for YOU.
                        </p>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center contact-profile my-5'>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={magnusImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Magnus Svendsen</p>
                        <p className="contact-role">CEO</p>
                        <p className="contact-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                    </div>
                </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={hannaImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Hanna Worum</p>
                        <p className="contact-role">Chief of Board</p>
                        <p className="contact-email"><a href="mailto:Hanna.worum@sefio.no">Hanna.worum@sefio.no</a></p>
                    </div>
                </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={henrikImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Henrik Mørk</p>
                        <p className="contact-role">CFO</p>
                        <p className="contact-email"><a href="mailto:henrik.mork@sefio.no">henrik.mork@sefio.no</a></p>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center contact-profile my-5'>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={johanImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Johan Sandbu</p>
                        <p className="contact-role">Board Representative - Høyskolen Kristiania</p>
                        <p className="contact-email"><a href="mailto:Johan.sandbu@sefio.no">Johan.sandbu@sefio.no</a></p>
                    </div>
                </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={elisabethImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Elisabeth Alvern</p>
                        <p className="contact-role">Board Representative - NMBU</p>
                        <p className="contact-email"><a href="mailto:Hanna.worum@sefio.no">Hanna.worum@sefio.no</a></p>
                    </div>
                </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div>
                        <img className="contact-image" src={arnarImage} alt="Contact Image" />
                    </div>
                    <div className="contact-details">
                        <p className="contact-name">Arnar Reiten</p>
                        <p className="contact-role">Board Representative - UIO</p>
                        <p className="contact-email"><a href="mailto:Arnar.reiten@sefio.no">Arnar.reiten@sefio.no</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
