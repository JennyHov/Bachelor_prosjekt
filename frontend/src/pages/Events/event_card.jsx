import React from 'react';

import '../../css/home_event.css';

const EventCard = ({ event }) => {
    const startDate = formatDate(event.start.dateTime || event.start.date);
    const eventTime = formatEventTime(event.start.dateTime, event.end.dateTime);

    return (
        <article className="home-event-card bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">
            <div className="home-date bg-orange-400 text-indigo-50 uppercase p-3">
                <div className="text-xl font-bold">{startDate}</div>
            </div>
            <div className="home-details p-4">
                <h2 className="text-lg font-bold">{event.summary}</h2>
                <p className="text-sm text-slate-500">{eventTime}</p>
            </div>
        </article>
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