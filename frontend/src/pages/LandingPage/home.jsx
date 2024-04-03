import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../../css/submit_application.css';

import React from 'react';
import rocketImage from '../../../../assets/images/home/rocket.png';
import counselingImage from '../../../../assets/images/home/counselling.png';
import instagramImage from '../../../../assets/images/home/instagram.png';
import facebookImage from '../../../../assets/images/home/facebook.png';
import whoAreWeImage from '../../../../assets/images/home/who_are_we.png';
import collaboratingImage from '../../../../assets/images/home/collaborating.png';
import linkedinImage from '../../../../assets/images/home/linkedin.png';
import sponsorImage from '../../../../assets/images/home/sponsor.png';
import henrikImage from '../../../../assets/images/home/henrik.png';
import hannaImage from '../../../../assets/images/home/hanna.png';
import magnusImage from '../../../../assets/images/home/magnus.png';
import johanImage from '../../../../assets/images/home/johan.png';
import elisabethImage from '../../../../assets/images/home/elisabeth.png';
import arnarImage from '../../../../assets/images/home/arnar.png';

const home = () => {
    return (
        <div className="content-fluid">
        <div className="container-fluid landing-section">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 justify-content-center align-items-center d-flex">
                    <img src={rocketImage} alt="Rocket Image" height={300} />
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
                            <p className="landing-link">
                            <Link to="/criteria" className="text-decoration-none text-primary">Read our criteria</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid counseling-section">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 counseling-content">
                    <div className="counseling-content-inner">
                        <h1 className="counseling-title">We offer free counseling</h1>
                        <p className="counseling-description">Our free counseling offers personalized advice from our team, helping you navigate, refine and elevate your ideas.</p>
                        <div className="counseling-button">
                            <Link to="/counseling" className="btn btn-primary">Apply for counseling</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 justify-content-center align-items-center d-flex">
                    <img src={counselingImage} alt="Counseling Image" height={300} />
                </div>
            </div>
        </div>
        <div className="container-fluid events-section">
        <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
                <div className="events-deadlines">
                    {/*
                    <div className="events-deadline">
                        <div className="events-date">25.Jan</div>
                        <div className="events-line"></div>
                        <div className="events-title">Next deadline for application</div>
                    </div>
                    <div className="events-deadline">
                        <div className="events-date">02.Feb</div>
                        <div className="events-line"></div>
                        <div className="events-title">Event At OsloMet</div>
                    </div>
                    <div className="events-deadline">
                        <div className="events-date">14.Feb</div>
                        <div className="events-line"></div>
                        <div className="events-title">Social hour at Justisen</div>
                    </div>
                    <div className="events-deadline">
                        <div className="events-date">05.Mar</div>
                        <div className="events-line"></div>
                        <div className="events-title">Next deadline for application</div>
                    </div>
                    <div className="events-deadline">
                        <div className="events-date">05.Mar</div>
                        <div className="events-line"></div>
                        <div className="events-title">Next deadline for application</div>
                    </div>
                    */}
                </div>
            </div>
            <div className="col-md-6 events-info">
                <div className="events-info-inner">
                    <h1 className="events-title">Events</h1>
                        <div className="events-description">
                            <p>
                                Explore Oslo's vibrant entrepreneurship scene! Our curated calendar helps you discover new perspectives, forge connections, and stay ahead. Join us in shaping the future of business, one event at a time! Have an event to add?
                                <span className="events-share">Share</span> the details, and we'll gladly include it!
                            </p>
                            <p>
                                <span className="events-all">Check out all upcoming events</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
                                <Link to="/collaborate" className="btn btn-primary">Start collaborating</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 justify-content-center align-items-center d-flex">
                    <img src={collaboratingImage} alt="Collaborating Image" height={300} />
                </div>
            </div>
        </div>

        <div className="container-fluid who-are-we-section">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 justify-content-center align-items-center d-flex">
                    <img className="who-are-we-image" src={whoAreWeImage} alt="Placeholder Image" height={300} />
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

        <div className="container-fluid contact-section">
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

        <div className="container-fluid sponsor-section">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 sponsor-content">
                    <div className="sponsor-content-inner">
                        <h1 className="sponsor-title">Our Sponsor - ANEO</h1>
                        <p className="sponsor-description">
                            Ideas that are guided through SEFiO have the opportunity to apply for up to NOK 25,000 to be able to verify the technology or the market. The Aneo grant is arranged approximately once a month and requires the start-up to be guided by us, submit a short application and present the idea to our panel.
                        </p>
                    </div>
                </div>
                <div className="col-md-6 justify-content-center align-items-center d-flex">
                    <img src={sponsorImage} alt="Counseling Image" height={300}/>
                </div>
            </div>
        </div>

        <div className="container-fluid social-section">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 justify-content-center align-items-center d-flex">
                    <div className="row social-icons">
                        <div className="col col-lg-3 social-icon">
                            <img src={linkedinImage} alt="Social Media Icon" height={30}/>
                        </div>
                        <div className="col col-lg-3 social-icon">
                            <img src={instagramImage} alt="Social Media Icon" height={30}/>
                        </div>
                        <div className="col col-lg-3 social-icon">
                            <img src={facebookImage} alt="Social Media Icon" height={30}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mission-statement">
                        <p>With a mission to empower 70,000 students across five member institutions, we're expanding our network to ensure more points of contact. Stay connected with us on social media for the latest updates and opportunities to kickstart your entrepreneurial dreams!</p>
                    </div>
                </div>
            </div>
        </div>    

        <div className="container youtube-section">
            <div className="row image-row">
                <div className="col-md-6">
                    {/* <img src="https://via.placeholder.com/501x280" alt="Placeholder Image" className="image" /> */}
                </div>
                <div className="col-md-6">
                    {/* <img src="https://via.placeholder.com/501x280" alt="Placeholder Image" className="image" /> */}
                </div>
            </div>
            <div className="row divider-row">
                <div className="col-md-12">
                    <div className="divider"></div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default home