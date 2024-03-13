import './style.css'
document.addEventListener('DOMContentLoaded', function() {
    // API key and calendar ID
    const API_KEY = 'AIzaSyAqv9tE4iDZgjmP8WH8dRTl6ayF5uc-sKo';
    const CALENDAR_ID = 'f390ea5d2b14d4be9eb4dd744e6a1b5e84ca241a7238be3d9b910023b940d70e@group.calendar.google.com';
    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;
  
    // Fetch events
    fetch(calendarUrl)
      .then(response => response.json())
      .then(data => {
        const eventsContainer = document.getElementById('events-container');
        // Clear out static events
        eventsContainer.innerHTML = '';
        
        // Process each event
        data.items.forEach(event => {
          const startDate = new Date(event.start.dateTime || event.start.date).toLocaleDateString();
          const endDate = new Date(event.end.dateTime || event.end.date).toLocaleDateString();
  
          // Create event article
          const eventArticle = document.createElement('article');
          eventArticle.className = 'bg-white dark:bg-slate-800 shadow-xl shadow-slate-200 dark:shadow-slate-800 rounded-lg';
          eventArticle.innerHTML = `
            <div class="p-3 shadow bg-[#F48A34] text-indigo-50 uppercase grid place-items-center rounded-t-lg">
              <div class="text-sm">${startDate}</div>
              <div class="text-3xl font-bold">${event.summary}</div>
            </div>
            <div class="p-4 md:p-6 lg:p-8 grid gap-4 md:gap-6">
              <div class="grid gap-1">
                <p class="text-slate-400 text-sm">${startDate} - ${endDate}</p>
                <h2 class="font-bold text-2xl">
                  <a href="${event.htmlLink}" target="_blank">${event.summary}</a>
                </h2>
                <p class="text-slate-400">${event.description || 'No details available'}</p>
              </div>
            </div>
          `;
  
          // Append to the container
          eventsContainer.appendChild(eventArticle);
        });
      })
      .catch(error => console.error('Error fetching events:', error));
  });