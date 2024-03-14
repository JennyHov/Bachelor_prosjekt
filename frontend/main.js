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

document.addEventListener('DOMContentLoaded', function() {
  const API_KEY = 'AIzaSyAqv9tE4iDZgjmP8WH8dRTl6ayF5uc-sKo';
  const CALENDAR_ID = 'f390ea5d2b14d4be9eb4dd744e6a1b5e84ca241a7238be3d9b910023b940d70e@group.calendar.google.com';
  const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

  const eventsContainer = document.getElementById('events-container');
  const gridButton = document.getElementById('grid');
  const listButton = document.getElementById('list');

  fetch(calendarUrl)
    .then(response => response.json())
    .then(data => {
      eventsContainer.innerHTML = '';
      data.items.sort((a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime));

      data.items.forEach((event, index) => {
        const startDate = formatDate(event.start.dateTime || event.start.date);
        const eventTime = formatEventTime(event.start.dateTime, event.end.dateTime);
        const hasDescription = event.description && event.description.trim() !== '';

        let detailsButtonHTML = hasDescription ? `
          <button class="toggle-details text-blue-600 hover:text-blue-800 focus:outline-none" aria-expanded="false" data-details-id="details-${index}">
            See details
          </button>
          <div class="event-details hidden text-slate-400" id="details-${index}">
            ${event.description}
          </div>
        ` : '';

        const eventArticleHTML = `
          <div class="date bg-orange-400 text-indigo-50 uppercase p-3">
            <div class="text-xl font-bold">${startDate}</div>
          </div>
          <div class="details p-4">
            <p class="text-sm text-slate-500">${eventTime}</p>
            <h2 class="text-lg font-bold">${event.summary}</h2>
            ${hasDescription ? `<div class="event-description text-slate-400">${event.description}</div>` : ''}
            ${detailsButtonHTML}
          </div>
        `;

        const eventArticle = document.createElement('article');
        eventArticle.className = 'event-card bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden';
        eventArticle.innerHTML = eventArticleHTML;
        eventsContainer.appendChild(eventArticle);
      });

      updateLayout(); // Call it here to update layout based on initial class
    })
    .catch(error => console.error('Error fetching events:', error));

  eventsContainer.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.toggle-details')) {
      const detailsId = e.target.getAttribute('data-details-id');
      const detailsDiv = document.getElementById(detailsId);
      const isExpanded = e.target.getAttribute('aria-expanded') === 'true';
      detailsDiv.classList.toggle('hidden');
      e.target.textContent = isExpanded ? 'See details' : 'Hide details';
      e.target.setAttribute('aria-expanded', !isExpanded);
    }
  });

  function updateLayout() {
    document.querySelectorAll('.event-card').forEach(card => {
      const detailsDiv = card.querySelector('.event-details');
      const detailsButton = card.querySelector('.toggle-details');
      const descriptionDiv = card.querySelector('.event-description');
      if (eventsContainer.classList.contains('grid')) {
        if (descriptionDiv) {
          descriptionDiv.classList.add('hidden');
        }
        if (detailsButton && detailsDiv) {
          detailsButton.classList.remove('hidden');
          detailsDiv.classList.add('hidden');
        }
      } else {
        if (descriptionDiv) {
          descriptionDiv.classList.remove('hidden');
        }
        if (detailsButton) {
          detailsButton.classList.add('hidden');
        }
      }
    });
  }

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
