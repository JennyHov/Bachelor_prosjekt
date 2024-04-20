import 'bootstrap/dist/css/bootstrap.min.css';

import '../../css/submit_application.css';
import '../../css/home.css';
import '../../css/home_event.css';

import CenterMode from '../Responsive.jsx';
import EventCard from '../Events/event_card.jsx';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import rocketImage from '../../../../assets/images/home/rocket.png';
import counselingImage from '../../../../assets/images/home/counselling.png';
import instagramImage from '../../../../assets/images/home/instagram.png';
import facebookImage from '../../../../assets/images/home/facebook.png';
import youtubeImage from '../../../../assets/images/home/youtube.png';
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


function eventHasPassed(endDate) {
    const now = new Date();
    const end = new Date(endDate);
    return now > end;
}

const home = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const API_KEY = 'AIzaSyAqv9tE4iDZgjmP8WH8dRTl6ayF5uc-sKo'; // Replace with your actual API Key
        const CALENDAR_ID = 'f390ea5d2b14d4be9eb4dd744e6a1b5e84ca241a7238be3d9b910023b940d70e@group.calendar.google.com'; // Replace with your actual Calendar ID
        const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

        fetch(calendarUrl)
            .then(response => response.json())
            .then(data => {
                const filteredEvents = data.items.filter(event => !eventHasPassed(event.end.dateTime || event.end.date))
                    .sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date))
                    .slice(0, 5); // Limiting the array to the first 5 events
                setEvents(filteredEvents);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div className="content-fluid p-5">
            <div style={{ height: '70px' }} />
            <div className="container-fluid section">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 justify-content-center d-flex align-items-center">
                        <img src={rocketImage} alt="Rocket Image" className="section-image"/>
                    </div>
                    <div className="col-md-6 landing-content d-flex justify-content-center">
                        <div className="content">
                            <h1 className="title">25.000NOK for your idea?</h1>
                            <p className="description">SEFiO supports your student startup with funding up to 25,000NOK!</p>
                            <div className="mt-2">
                                <Link to="/submit-application" className="btn btn-primary secondary-button">Apply for Funding</Link>
                            </div>
                            <div className="py-3">
                                <p className="description">Unsure about what it takes?
                                <span className="landing-link">
                                    <Link to="/criteria" className="text-primary"> Read our criteria</Link>
                                </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='stroke'></div>

            <div className="container-fluid section">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 counseling-content d-flex justify-content-center">
                        <div className="content">
                            <h1 className="title">We offer free counseling</h1>
                            <p className="description">Our free counseling offers personalized advice from our team, helping you navigate, refine and elevate your ideas.</p>
                            <div className="mt-2">
                                <Link to="/counseling" className="btn btn-primary secondary-button">Apply for counseling</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 justify-content-center align-items-center d-flex">
                        <img src={counselingImage} alt="Counseling Image" className="section-image"/>
                    </div>
                </div>
            </div>

            <div className='stroke'></div>

            <div className="container-fluid section">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="home-events-deadlines content-wrapper">
                            <section className='home-events-container'>
                                {events.map((event, index) => (
                                    <EventCard key={index} event={event} />
                                ))}
                            </section>
                        </div>
                    </div>
                    <div className="col-md-6 home-events-info d-flex justify-content-center">
                        <div className="content">
                            <h1 className="title home-event-title">Events</h1>
                            <p className="description">
                                Explore Oslo's vibrant entrepreneurship scene! Our curated calendar helps you discover new perspectives, forge connections, and stay ahead. Join us in shaping the future of business, one event at a time! Have an event to add?{' '}
                                <Link to="/contact-us" className="text-primary">
                                    Share
                                </Link>{' '}
                                the details, and we'll gladly include it!
                            </p>
                            <p className="description">
                                <Link to="/events" className="description text-primary">
                                    Check out all upcoming events
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='stroke'></div>

            <div className="container-fluid section">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="content">
                            <h1 className="title collaboration-title">What about collaborating?</h1>
                                <p className='description'>
                                    Explore a pool of students, groups, professors, and find your like-minded individuals ready to collaborate.
                                </p>
                                <div className="mt-2">
                                    <Link to="/collaborate" className="btn btn-primary secondary-button">Start collaborating</Link>
                                </div>
                        </div>
                    </div>
                    <div className="col-md-6 justify-content-center align-items-center d-flex">
                        <img src={collaboratingImage} alt="Collaborating Image" className="section-image"/>
                    </div>
                </div>
            </div>

            <div className='stroke'></div>

            <div className="container-fluid section">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 justify-content-center align-items-center d-flex">
                        <img src={whoAreWeImage} alt="Placeholder Image" className="section-image"/>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="content">
                            <h1 className="title">Who are we?</h1>
                                <p className='description'>
                                    The student’s Entrepreneurship Fund in Oslo (SEFiO) is by and for students in Oslo. Together with Oslo’s five major educational institutions, the municipality, partners and sponsor ANEO - SEFiO provides activities and learnings for any student interested in starting their innovation journey.
                                </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid content-item-section">
                <div className='row justify-content-start contact-profile media-scroller snaps-inline my-5'>
                    <div className="contact-item media-element">
                        <div className="image-content">
                            <div className="card-image">
                                <img className="card-img" src={magnusImage} alt="Card Image" />
                            </div>
                        </div>
                        <div className="card-content">
                        <p className="card-name">Magnus Svendsen</p>
                        <p className="card-role">CEO</p>
                        <hr className="representative-divider" />
                        <p className="card-institution">Handles all requests</p>
                        <p className="card-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                    </div>
                    </div>
                    <div className="contact-item media-element">
                        <div className="image-content">
                            <div className="card-image">
                                <img className="card-img" src={hannaImage} alt="Card Image" />
                            </div>
                        </div>
                        <div className="card-content">
                            <p className="card-name">Hanna Worum</p>
                            <p className="card-role">Chief of Board and Representative</p>
                            <hr className="representative-divider" />
                            <p className="card-institution">Oslomet</p>
                            <p className="card-email"><a href="mailto:hanna.worum@sefio.no">hanna.worum@sefio.no</a></p>
                    </div>
                    </div>
                    <div className="contact-item media-element">
                        <div className="image-content">
                            <div className="card-image">
                                <img className="card-img" src={henrikImage} alt="Card Image" />
                            </div>
                        </div>
                        <div className="card-content">
                            <p className="card-name">Henrik Mørk</p>
                            <p className="card-role">CFO and Board Representative</p>
                            <hr className="representative-divider" />
                            <p className="card-institution">BI</p>
                            <p className="card-email"><a href="mailto:henrik.mork@sefio.no">henrik.mork@sefio.no</a></p>
                    </div>
                    </div>
                    <div className="contact-item media-element">
                        <div className="image-content">
                            <div className="card-image">
                                <img className="card-img" src={johanImage} alt="Card Image" />
                            </div>
                        </div>
                        <div className="card-content">
                            <p className="card-name">Johan Sandbu</p>
                            <p className="card-role">Board Representative</p>
                            <hr className="representative-divider" />
                            <p className='card-institution'>Høyskolen Kristiania</p>
                            <p className="card-email"><a href="mailto:johan.sandbu@sefio.no">johan.sandbu@sefio.no</a></p>
                        </div>
                    </div>
                    <div className="contact-item media-element">
                        <div className="image-content">
                            <div className="card-image">
                                <img className="card-img" src={elisabethImage} alt="Card Image" />
                            </div>
                        </div>
                        <div className="card-content">
                            <p className="card-name">Elisabeth Alvern</p>
                            <p className="card-role">Board Representative</p>
                            <hr className="representative-divider" />
                            <p className="card-institution">NMBU</p>
                            <p className="card-email"><a href="mailto:elisabeth.alvern@sefio.no">elisabeth.alvern@sefio.no</a></p>
                        </div>
                    </div>
                    <div className="contact-item media-element">
                        <div className="image-content">
                            <div className="card-image">
                                <img className="card-img" src={arnarImage} alt="Card Image" />
                            </div>
                        </div>
                        <div className="card-content">
                            <p className="card-name">Arnar Reiten</p>
                            <p className="card-role">Board Representative</p>
                            <hr className="representative-divider" />
                            <p className="card-institution">UiO</p>
                            <p className="card-email"><a href="mailto:arnar.reiten@sefio.no">arnar.reiten@sefio.no</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='stroke'></div>

            <div className="container-fluid section">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 d-flex justify-content-center sponsor-content">
                        <div className="content">
                            <h1 className="title">Our Sponsor - ANEO</h1>
                                <p className='description'>
                                    Ideas that are guided through SEFiO have the opportunity to apply for up to NOK 25,000 to be able to verify the technology or the market. The Aneo grant is arranged approximately once a month and requires the start-up to be guided by us, submit a short application and present the idea to our panel.
                                </p>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-centerx">
                        <img src={sponsorImage} alt="Counseling Image" className="section-image"/>
                    </div>
                </div>
            </div>

            <div className='stroke'></div>

            <CenterMode />

            <div className='stroke'></div>

            <div className="container-fluid section">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="row social-icons">
                            <div className="col col-lg-2 social-icon">
                                <a href='https://www.linkedin.com/company/studentenes-entrepren%C3%B8rskapsfond-i-oslo/' target='_blank' rel='noopener noreferrer'>
                                    <img src={linkedinImage} alt="Social Media Icon" className="social-icon"/>
                                </a>
                            </div>
                            <div className="col col-lg-2 social-icon">
                                <a href='https://www.instagram.com/sefio.no/' target='_blank' rel='noopener noreferrer'>
                                    <img src={instagramImage} alt="Social Media Icon" className="social-icon"/>
                                </a>
                            </div>
                            <div className="col col-lg-2 social-icon">
                                <a href='https://www.facebook.com/profile.php?id=100095361750473' target='_blank' rel='noopener noreferrer'>
                                    <img src={facebookImage} alt="Social Media Icon" className="social-icon"/>
                                </a>
                            </div>
                            <div className="col col-lg-2 social-icon">
                                <a href='https://www.youtube.com/channel/UCydcGoyzNwbNudj9lQjK4vQ/about' target='_blank' rel='noopener noreferrer'>
                                    <img src={youtubeImage} alt="Social Media Icon" className="social-icon"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="content">
                            <p className='description'>
                                With a mission to empower 70,000 students across five member institutions, we're expanding our network to ensure more points of contact. Stay connected with us on social media for the latest updates and opportunities to kickstart your entrepreneurial dreams!
                            </p>
                        </div>
                    </div>
                </div>
            </div>  

            <div className='stroke'></div>  

            <div className="container-fluid section">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <iframe 
                            width="90%" 
                            height="283" 
                            src="https://www.youtube.com/embed/13w77dTMCds" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className="col-md-6">
                        <iframe 
                            width="90%" 
                            height="283" 
                            src="https://www.youtube.com/embed/73vhFLlUSVU" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>

            <div className='stroke'></div>

        </div>
    );
}


export default home