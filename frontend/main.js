import './style.css'

// Function to format date as '10.MAR'
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate(); // Get the day as a number
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(); // Get the 3-letter month
    return `${day}.${month}`; // Combine them in the desired format
  }
// Function to format the start and end times of the event
function formatEventTime(startDate, endDate) {
    // Create options for formatting the date and time separately
    const dateOptions = { weekday: 'long' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  
    // Create date objects for the start and end times
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Format the start and end times separately
    const formattedStartDate = start.toLocaleDateString('en-US', dateOptions);
    const formattedStartTime = start.toLocaleTimeString('en-US', timeOptions);
    const formattedEndTime = end.toLocaleTimeString('en-US', timeOptions);
  
    // Combine the formatted start date and time with the end time
    return `${formattedStartDate}, ${formattedStartTime} - ${formattedEndTime}`;
  }
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

        
        // Process each event
        data.items.forEach(event => {
            const startDate = formatDate(event.start.dateTime || event.start.date);
            const endDate = formatDate(event.end.dateTime || event.end.date);
            const eventTime = formatEventTime(event.start.dateTime, event.end.dateTime);
  
          // Create event article
          const eventArticle = document.createElement('article');
          eventArticle.className = 'bg-white dark:bg-slate-800 shadow-xl shadow-slate-200 dark:shadow-slate-800 rounded-lg';
          eventArticle.innerHTML = `
          <div class="p-3 shadow bg-[#F48A34] text-indigo-50 uppercase grid place-items-center rounded-t-lg">
          <div class="text-xl font-bold">${startDate}</div>
        </div>
        <div class="p-4 md:p-6 lg:p-8 grid gap-4 md:gap-3">
        <div class="text-sm text-gray-500">${eventTime}</div>
        <h2 class="font-bold text-xl">${event.summary}</h2>
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