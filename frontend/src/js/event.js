import '../css/event.css';

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
    const gridButton = document.getElementById('grid');
    const listButton = document.getElementById('list');

    fetch(calendarUrl)
        .then(response => response.json())
        .then(data => {
            eventsContainer.innerHTML = '';

            const events = data.items
                .filter(event => !eventHasPassed(event.end.dateTime || event.end.date))
                .sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));

            events.forEach((event, index) => {
                const startDate = formatDate(event.start.dateTime || event.start.date);
                const eventTime = formatEventTime(event.start.dateTime, event.end.dateTime);
                let locationHTML = event.location ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}" target="_blank" class="text-sm text-[#5192d3] md:underline">${event.location}</a>` : 'No address available.';
                const hasDescription = event.description && event.description.trim() !== '';


                const detailsButtonHTML = hasDescription ? `
                    <button class="toggle-details text-gray-600 hover:text-gray-800 focus:outline-none" aria-expanded="false" data-details-id="details-${index}">
                        See details
                    </button>
                ` : '';

                const eventArticle = document.createElement('article');
                eventArticle.className = 'event-card bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden';
                eventArticle.innerHTML = `
                    <div class="date bg-orange-400 text-indigo-50 uppercase p-3">
                        <div class="text-xl font-bold">${startDate}</div>
                    </div>
                    <div class="details p-4">
                        <h2 class="text-lg font-bold">${event.summary}</h2>
                        <p class="text-sm text-slate-500">${eventTime}</p>
                        <p class="text-sm text-slate-500 mb-1">${locationHTML}</p>
                        <div class="event-description text-slate-400 hidden" id="details-${index}">
                            ${event.description || ''}
                        </div>
                        ${detailsButtonHTML}
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
                  // Check if in grid view or list view and hide/show elements accordingly
        if (isGrid) {
          descriptionDiv && descriptionDiv.classList.add('hidden');
          detailsButton && detailsButton.classList.remove('hidden');
      } else {
          descriptionDiv && descriptionDiv.classList.remove('hidden');
          detailsButton && detailsButton.classList.add('hidden');
      }

      // Ensure location is always visible
      locationParagraph && locationParagraph.classList.remove('hidden');
  });
}

// Event listener for toggling event details
eventsContainer.addEventListener('click', (e) => {
  if (e.target && e.target.matches('.toggle-details')) {
      const detailsId = e.target.getAttribute('data-details-id');
      const detailsDiv = document.getElementById(detailsId);
      const isExpanded = e.target.getAttribute('aria-expanded') === 'true';

      detailsDiv.classList.toggle('hidden');
      e.target.textContent = isExpanded ? 'Hide details' : 'See details';
      e.target.setAttribute('aria-expanded', !isExpanded);
  }
});

// Event listeners for grid and list view toggles
gridButton.addEventListener('click', () => {
  eventsContainer.classList.add('grid');
  eventsContainer.classList.remove('list');
  gridButton.classList.add('active');
  listButton.classList.remove('active');
  updateLayout();
});

listButton.addEventListener('click', () => {
  eventsContainer.classList.add('list');
  eventsContainer.classList.remove('grid');
  listButton.classList.add('active');
  gridButton.classList.remove('active');
  updateLayout();
});
});
