import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CountDownAdmin = () => {
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async () => {
        const response = await fetch('/api/countdown/set', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endTime: endDate })
        });
        const data = await response.json();
        alert('Countdown set: ' + new Date(data.endTime).toLocaleString());
    };

    return (
        <div>
            <h2>Set Countdown End Date and Time</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Select end date and time:</Form.Label>
                    <Form.Control type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </Form.Group>
                <Button onClick={handleSubmit}>Set Countdown</Button>
            </Form>
        </div>
    );
};

export default CountDownAdmin;
