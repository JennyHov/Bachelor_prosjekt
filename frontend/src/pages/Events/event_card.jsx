import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/home_event.css';

const EventCard = ({ event }) => {
    const startDate = formatDate(event.start.dateTime || event.start.date);
    const eventTime = formatEventTime(event.start.dateTime, event.end.dateTime);

    return (
        <Link to={`/events/${event.id}`}>
            <div className="home-event-card">
                <div className="home-date p-3">
                    <div className="home-event-date">{startDate}</div>
                </div>
                <div className="home-details p-4">
                    <h2 className="home-event-title">{event.summary}</h2>
                    <p className="home-event-time">{eventTime}</p>
                </div>
            </div> 
        </Link>
    );
};

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

export default EventCard;