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
    useEffect(() => {
        // Retrieve the selected event ID from local storage
        const selectedEventId = localStorage.getItem('selectedEvent');
    
        if (selectedEventId) {
            setTimeout(() => {
                // Scroll to the selected event card
                const selectedEventElement = document.getElementById(selectedEventId);
                console.log(selectedEventElement); // Check if the element is found
                if (selectedEventElement) {
                    selectedEventElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500); // lag 0,5 sekunder delay 
        }
    }, []);

    const [events, setEvents] = useState([]);
    const { eventId } = useParams();
    console.log(eventId);

    useEffect(() => {
        const API_KEY = 'AIzaSyAqv9tE4iDZgjmP8WH8dRTl6ayF5uc-sKo'; // API Key
        const CALENDAR_ID = 'f390ea5d2b14d4be9eb4dd744e6a1b5e84ca241a7238be3d9b910023b940d70e@group.calendar.google.com'; // Calendar ID
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
      
          <main className='row justify-content-center align-items-center gap-3'>
            <div className='col-lg-6 events-container'>
              <header className='title-container'>
                <h1 className='page-title'>Join our events</h1>
              </header>
              <section className='message-container'>
                <p className='page-message events-message'>
                  Events related to entrepreneurship and finance. Would you like to{' '}
                  <Link to="/contact-us" className="text-primary">suggest</Link> any events?
                </p>
              </section>
            </div>
      
            <div className='max-w-4xl event-row'>
              <section className='grid'>
                {events.map((event, index) => (
                  <EventCard key={index} event={event} highlight={event.id === eventId} />
                ))}
              </section>
            </div>
          </main>
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
        <article id={event.id} className={`event-card ${highlight ? 'highlight' : ''}`}>
          <div className='event-date-container p-3'>
            <time dateTime={event.startDateTime} className='event-date'>{startDate}</time>
          </div>
          <div className='event-details p-4'>
            <h2 className='event-title'>{event.summary}</h2>
            <p className='event-time'>{eventTime}</p>
            <p className='event-location'>{locationHTML}</p>
            <div className={`event-description ${showDetails ? '' : 'event-hidden'}`} aria-hidden={!showDetails}>
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