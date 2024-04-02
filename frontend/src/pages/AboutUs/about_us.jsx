import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
                <div className='col-lg-6 border-bottom border-zinc-400 p-4'>
                    <div className='row justify-content-center align-items-start gap-3'>
                        <div className="col-lg-12">
                            <h1 className="text-center text-black font-bold font-inter text-4xl leading-14">About Us</h1>
                        </div>
                        <div className="col-lg-12">
                            <p className="text-center text-black font-normal font-inter text-base leading-10">
                                SEFiO is on a mission for 70,000 students spread across five member institutions – that means more points of contact! No matter who you reach out to, we can guarantee one thing – we are here for YOU.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col-md-4 contact-item">
                    <img className="contact-image" src={magnusImage} alt="Contact Image" />
                    <div className="contact-details">
                        <span className="contact-name">Magnus Svendsen</span>
                        <span className="contact-role">CEO</span>
                        <span className="contact-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></span>
                    </div>
                </div>
                <div className="col-md-4 contact-item">
                    <img className="contact-image" src={hannaImage} alt="Contact Image" />
                    <div className="contact-details">
                        <span className="contact-name">Hanna Worum</span>
                        <span className="contact-role">Chief of Board</span>
                        <span className="contact-email"><a href="mailto:Hanna.worum@sefio.no">Hanna.worum@sefio.no</a></span>
                    </div>
                </div>
                <div className="col-md-4 contact-item">
                    <img className="contact-image" src={henrikImage} alt="Contact Image" />
                    <div className="contact-details">
                        <span className="contact-name">Henrik Mørk</span>
                        <span className="contact-role">CFO</span>
                        <span className="contact-email"><a href="mailto:henrik.mork@sefio.no">henrik.mork@sefio.no</a></span>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col-md-4 contact-item">
                    <img className="contact-image" src={johanImage} alt="Contact Image" />
                    <div className="contact-details">
                        <span className="contact-name">Johan Sandbu</span>
                        <span className="contact-role">Board Representative - Høyskolen Kristiania</span>
                        <span className="contact-email"><a href="mailto:Johan.sandbu@sefio.no">Johan.sandbu@sefio.no</a></span>
                    </div>
                </div>
                <div className="col-md-4 contact-item">
                    <img className="contact-image" src={elisabethImage} alt="Contact Image" />
                    <div className="contact-details">
                        <span className="contact-name">Elisabeth Alvern</span>
                        <span className="contact-role">Board Representative - NMBU</span>
                        <span className="contact-email"><a href="mailto:Hanna.worum@sefio.no">Hanna.worum@sefio.no</a></span>
                    </div>
                </div>
                <div className="col-md-4 contact-item">
                    <img className="contact-image" src={arnarImage} alt="Contact Image" />
                    <div className="contact-details">
                        <span className="contact-name">Arnar Reiten</span>
                        <span className="contact-role">Board Representative - UIO</span>
                        <span className="contact-email"><a href="mailto:Arnar.reiten@sefio.no">Arnar.reiten@sefio.no</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
