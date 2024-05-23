import React, { useState, useEffect } from 'react';
import '../../css/countdown.css';

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState('Loading countdown...');

    useEffect(() => {
        let timer;  // Declare the timer in the outer scope of useEffect

        const fetchCountdown = async () => {
            try {
                const response = await fetch('/api/countdown/get');
                const data = await response.json();
                if (data && data.endTime) {
                    updateTimeLeft(new Date(data.endTime));
                } else {
                    setTimeLeft("No countdown set.");
                }
            } catch (error) {
                console.error('Error fetching countdown:', error);
                setTimeLeft("Failed to load countdown.");
            }
        };

        const updateTimeLeft = (endTime) => {
            timer = setInterval(() => {
                const now = new Date();
                const distance = endTime.getTime() - now.getTime();
                if (distance < 0) {
                    clearInterval(timer);
                    setTimeLeft("Time's up!");
                    return;
                }
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft(`Next deadline in: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
            }, 1000);
        };

        fetchCountdown();

        return () => clearInterval(timer);  // Cleanup function now has access to the timer
    }, []);

    return (
        <div className="countdown-container d-flex justify-content-center align-items-center" role="timer" aria-live="polite">
            <p className="countdown-content">{timeLeft}</p>
        </div>
    );    
};

export default Countdown;
