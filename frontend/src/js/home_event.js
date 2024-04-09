import './style.css';

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

document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'AIzaSyAqv9tE4iDZgjmP8WH8dRTl6ayF5uc-sKo'; // Replace with your actual API Key
    const CALENDAR_ID = 'f390ea5d2b14d4be9eb4dd744e6a1b5e84ca241a7238be3d9b910023b940d70e@group.calendar.google.com'; // Replace with your actual Calendar ID
    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

    const eventsContainer = document.getElementById('events-container');

    fetch(calendarUrl)
        .then(response => response.json())
        .then(data => {
            eventsContainer.innerHTML = '';

            const events = data.items
            .filter(event => !eventHasPassed(event.end.dateTime || event.end.date))
            .sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date))
            .slice(0, 5); // This will limit the array to the first 4 events

            events.forEach((event, index) => {
                const startDate = formatDate(event.start.dateTime || event.start.date);
                const eventTime = formatEventTime(event.start.dateTime, event.end.dateTime);

                const eventArticle = document.createElement('article');
                eventArticle.className = 'event-card bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden';
                eventArticle.innerHTML = `
                    <div class="date bg-orange-400 text-indigo-50 uppercase p-3">
                        <div class="text-xl font-bold">${startDate}</div>
                    </div>
                    <div class="details p-4">
                        <p class="text-lg font-bold">${event.summary}</p>
                    </div>
                `;

                eventsContainer.appendChild(eventArticle);
            });

            updateLayout();
        })
        .catch(error => console.error('Error fetching events:', error));

    function updateLayout() {
        const isGrid = eventsContainer.classList.contains('grid');
        document.querySelectorAll('.event-card').forEach(card => {
          const detailsButton = card.querySelector('.toggle-details');
          const descriptionDiv = card.querySelector('.event-description');
          const locationParagraph = card.querySelector('.location');
  });
}
});