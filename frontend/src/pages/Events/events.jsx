import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import '../../css/event.css';

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return `${day}.${month}`;
}

function formatEventTime(startDate, endDate) {
    const dateOptions = { weekday: 'long' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const start = new Date(startDate);
    const end = new Date(endDate);
    const formattedStartTime = start.toLocaleTimeString('en-US', timeOptions);
    const formattedEndTime = end.toLocaleTimeString('en-US', timeOptions);
    return `${start.toLocaleDateString('en-US', dateOptions)}, ${formattedStartTime} - ${formattedEndTime}`;
}

function eventHasPassed(endDate) {
    const now = new Date();
    const end = new Date(endDate);
    return now > end;
}

const Events = () => {
    const [events, setEvents] = useState([]);
    const { eventId } = useParams();

    useEffect(() => {
        const API_KEY = 'AIzaSyAqv9tE4iDZgjmP8WH8dRTl6ayF5uc-sKo'; // Replace with your actual API Key
        const CALENDAR_ID = 'f390ea5d2b14d4be9eb4dd744e6a1b5e84ca241a7238be3d9b910023b940d70e@group.calendar.google.com'; // Replace with your actual Calendar ID
        const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

        fetch(calendarUrl)
            .then(response => response.json())
            .then(data => {
                const filteredEvents = data.items.filter(event => !eventHasPassed(event.end.dateTime || event.end.date));
                const sortedEvents = filteredEvents.sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));
                setEvents(sortedEvents);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div className='container page-container'>
            <div style={{ height: '70px' }} />
            <div className='row justify-content-center align-items-center gap-3'>
                <div className='col-lg-6 events-container'>
                    <div className='title-container'>
                        <h1 className='page-title'>Join our events</h1>
                    </div>
                    <div className='message-container'>
                        <p className='page-message events-message'>
                            Events related to entrepreneurship and finance. Would you like to <Link to="/contact-us" className="text-primary">
                                    suggest
                                </Link>{' '} any events?
                        </p>
                    </div>
                </div>
                <div className='max-w-4xl w-full mx-auto'>
                    <section className='grid items-start grid-cols-cards'>
                        {events.map((event, index) => (
                            <EventCard key={index} event={event} highlight={event.id === eventId} />
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
}

const EventCard = ({ event, highlight }) => {
    const startDate = formatDate(event.start.dateTime || event.start.date);
    const eventTime = formatEventTime(event.start.dateTime, event.end.dateTime);
    const locationHTML = event.location ? (
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`} target="_blank" className="text-sm text-[#5192d3] md:underline">
            {event.location}
        </a>
    ) : (
        'No address available.'
    );
    const hasDescription = event.description && event.description.trim() !== '';
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <article className={`event-card ${highlight ? 'highlight' : ''}`}>
            <div className='event-date-container p-3'>
                <div className='event-date'>{startDate}</div>
            </div>
            <div className='event-details p-4'>
                <h2 className='event-title'>{event.summary}</h2>
                <p className='event-time'>{eventTime}</p>
                <p className='event-location'>{locationHTML}</p>
                <div className={`event-description ${showDetails ? '' : 'event-hidden'}`}>
                    {event.description || ''}
                </div>
                {hasDescription && (
                    <button className='toggle-details' aria-expanded={showDetails} onClick={toggleDetails}>
                        {showDetails ? 'Hide details' : 'See details'}
                    </button>
                )}
            </div>
        </article>
    );
}

export default Events;