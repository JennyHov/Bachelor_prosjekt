import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/submit_application.css';
import '../../css/pages.css';
import '../../css/home.css';

import henrikImage from '../../../../assets/images/home/henrik.png';
import hannaImage from '../../../../assets/images/home/hanna.png';
import magnusImage from '../../../../assets/images/home/magnus.png';
import johanImage from '../../../../assets/images/home/johan.png';
import elisabethImage from '../../../../assets/images/home/elisabeth.png';
import arnarImage from '../../../../assets/images/home/arnar.png';

export default function AboutUs () {
    return (
        <div className='container page-container'>
            <div style={{ height: '70px' }} />
            <section className='row justify-content-center align-items-center gap-3'>
                <div className='col-lg-6 about-us-container'>
                    <header className="title-container">
                        <h1 className="page-title about-us-title">About Us</h1>
                    </header>
                    <div className="message-container">
                        <p className="page-message">
                            SEFiO is on a mission for 70,000 students spread across five member institutions – that means more points of contact! No matter who you reach out to, we can guarantee one thing – we are here for YOU.
                        </p>
                    </div>
                </div>
            </section>
            <section className='row justify-content-center contact-profile my-5'>
                <article className="col-sm-4 contact-item mx-5">
                    <figure className="image-content">
                        <div className="card-image">
                            <img className="card-img" src={magnusImage} alt="Card Image" />
                        </div>
                    </figure>
                    <div className="card-content">
                        <p className="card-name">Magnus Svendsen</p>
                        <p className="card-role">CEO</p>
                        <hr className="representative-divider" />
                        <p className="card-institution">Handles all requests</p>
                        <p className="card-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                    </div>
                </article>
                <article className="col-sm-4 contact-item mx-5">
                    <figure className="image-content">
                        <div className="card-image">
                            <img className="card-img" src={hannaImage} alt="Card Image" />
                        </div>
                    </figure>
                    <div className="card-content">
                        <p className="card-name">Hanna Worum</p>
                        <p className="card-role">Chief of Board and Representative</p>
                        <hr className="representative-divider" />
                        <p className="card-institution">Oslomet</p>
                        <p className="card-email"><a href="mailto:hanna.worum@sefio.no">hanna.worum@sefio.no</a></p>
                    </div>
                </article>
                <article className="col-sm-4 contact-item mx-5">
                    <figure className="image-content">
                        <div className="card-image">
                            <img className="card-img" src={henrikImage} alt="Card Image" />
                        </div>
                    </figure>
                    <div className="card-content">
                        <p className="card-name">Henrik Mørk</p>
                        <p className="card-role">CFO and Board Representative</p>
                        <hr className="representative-divider" />
                        <p className="card-institution">BI</p>
                        <p className="card-email"><a href="mailto:henrik.mork@sefio.no">henrik.mork@sefio.no</a></p>
                    </div>
                </article>
            </section>
            <section className='row justify-content-center contact-profile my-5'>
                <article className="col-sm-4 contact-item mx-5">
                    <figure className="image-content">
                        <div className="card-image">
                            <img className="card-img" src={johanImage} alt="Card Image" />
                        </div>
                    </figure>
                    <div className="card-content">
                        <p className="card-name">Johan Sandbu</p>
                        <p className="card-role">Board Representative</p>
                        <hr className="representative-divider" />
                        <p className='card-institution'>Høyskolen Kristiania</p>
                        <p className="card-email"><a href="mailto:johan.sandbu@sefio.no">johan.sandbu@sefio.no</a></p>
                    </div>
                </article>
                <article className="col-sm-4 contact-item mx-5">
                    <figure className="image-content">
                        <div className="card-image">
                            <img className="card-img" src={elisabethImage} alt="Card Image" />
                        </div>
                    </figure>
                    <div className="card-content">
                        <p className="card-name">Elisabeth Alvern</p>
                        <p className="card-role">Board Representative</p>
                        <hr className="representative-divider" />
                        <p className="card-institution">NMBU</p>
                        <p className="card-email"><a href="mailto:elisabeth.alvern@sefio.no">elisabeth.alvern@sefio.no</a></p>
                    </div>
                </article>
                <article className="col-sm-4 contact-item mx-5">
                    <figure className="image-content">
                        <div className="card-image">
                            <img className="card-img" src={arnarImage} alt="Card Image" />
                        </div>
                    </figure>
                    <div className="card-content">
                        <p className="card-name">Arnar Reiten</p>
                        <p className="card-role">Board Representative</p>
                        <hr className="representative-divider" />
                        <p className="card-institution">UiO</p>
                        <p className="card-email"><a href="mailto:arnar.reiten@sefio.no">arnar.reiten@sefio.no</a></p>
                    </div>
                </article>
            </section>
        </div>
    );    
}
