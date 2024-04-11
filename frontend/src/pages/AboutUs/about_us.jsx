import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/submit_application.css';
import '../../css/pages.css';

import henrikImage from '../../../../assets/images/home/henrik.png';
import hannaImage from '../../../../assets/images/home/hanna.png';
import magnusImage from '../../../../assets/images/home/magnus.png';
import johanImage from '../../../../assets/images/home/johan.png';
import elisabethImage from '../../../../assets/images/home/elisabeth.png';
import arnarImage from '../../../../assets/images/home/arnar.png';

export default function AboutUs () {
    return (
        <div className='container page-container'>
            <div className='row justify-content-center align-items-center gap-3'>
                <div className='col-lg-6 about-us-container'>
                    <div className="title-container">
                        <h1 className="page-title about-us-title">About Us</h1>
                    </div>
                    <div className="message-container">
                        <p className="page-message">
                            SEFiO is on a mission for 70,000 students spread across five member institutions – that means more points of contact! No matter who you reach out to, we can guarantee one thing – we are here for YOU.
                        </p>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center contact-profile my-5'>
                <div className="col-sm-4 contact-item mx-5">
                    <div className="image-content">
                            <div className="card-image">
                            <img className="card-img" src={magnusImage} alt="Card Image" />
                            </div>
                        </div>
                        <div className="card-content">
                            <p className="card-name">Magnus Svendsen</p>
                            <p className="card-category">CEO - Handles all requests</p>
                            <p className="card-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                        </div>
                    </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div className="image-content">
                        <div className="card-image">
                            <img className="card-img" src={hannaImage} alt="Card Image" />
                        </div>
                    </div>
                    <div className="card-content">
                        <p className="card-name">Hanna Worum</p>
                        <p className="card-category">Chief of Board and Representative - Oslomet</p>
                        <p className="card-email"><a href="mailto:hanna.worum@sefio.no">hanna.worum@sefio.no</a></p>
                    </div>
                </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div className="image-content">
                        <div className="card-image">
                            <img className="card-img" src={henrikImage} alt="Card Image" />
                        </div>
                    </div>
                    <div className="card-content">
                        <p className="card-name">Henrik Mørk</p>
                        <p className="card-category">CFO and Board Representative - BI</p>
                        <p className="card-email"><a href="mailto:henrik.mork@sefio.no">henrik.mork@sefio.no</a></p>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center contact-profile my-5'>
                <div className="col-sm-4 contact-item mx-5">
                    <div className="image-content">
                        <div className="card-image">
                            <img className="card-img" src={johanImage} alt="Card Image" />
                        </div>
                    </div>
                    <div className="card-content">
                        <p className="card-name">Johan Sandbu</p>
                        <p className="card-category">Board Representative - Høyskolen Kristiania</p>
                        <p className="card-email"><a href="mailto:johan.sandbu@sefio.no">johan.sandbu@sefio.no</a></p>
                    </div>
                </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div className="image-content">
                        <div className="card-image">
                            <img className="card-img" src={elisabethImage} alt="Card Image" />
                        </div>
                    </div>
                    <div className="card-content">
                        <p className="card-name">Elisabeth Alvern</p>
                        <p className="card-category">Board Representative - NMBU</p>
                        <p className="card-email"><a href="mailto:elisabeth.alvern@sefio.no">elisabeth.alvern@sefio.no</a></p>
                    </div>
                </div>
                <div className="col-sm-4 contact-item mx-5">
                    <div className="image-content">
                        <div className="card-image">
                            <img className="card-img" src={arnarImage} alt="Card Image" />
                        </div>
                    </div>
                    <div className="card-content">
                        <p className="card-name">Arnar Reiten</p>
                        <p className="card-category">Board Representative - UiO</p>
                        <p className="card-email"><a href="mailto:arnar.reiten@sefio.no">arnar.reiten@sefio.no</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
