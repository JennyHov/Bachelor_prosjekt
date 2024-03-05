
const EventsSection = () => {
  return (
    <div className="container-fluid events-section">
    <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
            <div className="events-deadlines">
                <div className="events-deadline">
                    <div className="events-date">25.Jan</div>
                    <div className="events-line"></div>
                    <div className="events-title">Next deadline for application</div>
                </div>
                <div className="events-deadline">
                    <div className="events-date">02.Feb</div>
                    <div className="events-line"></div>
                    <div className="events-title">Event At OsloMet</div>
                </div>
                <div className="events-deadline">
                    <div className="events-date">14.Feb</div>
                    <div className="events-line"></div>
                    <div className="events-title">Social hour at Justisen</div>
                </div>
                <div className="events-deadline">
                    <div className="events-date">05.Mar</div>
                    <div className="events-line"></div>
                    <div className="events-title">Next deadline for application</div>
                </div>
                <div className="events-deadline">
                    <div className="events-date">05.Mar</div>
                    <div className="events-line"></div>
                    <div className="events-title">Next deadline for application</div>
                </div>
            </div>
        </div>
        <div className="col-md-6 events-info">
            <div className="events-info-inner">
                <h1 className="events-title">Events</h1>
                <div className="events-description">
                    <p>
                        Explore Oslo's vibrant entrepreneurship scene! Our curated calendar helps you discover new perspectives, forge connections, and stay ahead. Join us in shaping the future of business, one event at a time! Have an event to add?
                        <span className="events-share">Share</span> the details, and we'll gladly include it!
                    </p>
                    <p>
                        <span className="events-all">Check out all upcoming events</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}

export default EventsSection