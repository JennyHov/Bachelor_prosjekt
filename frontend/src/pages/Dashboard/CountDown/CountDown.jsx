import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CountDownAdmin = () => {
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async () => {
        const response = await fetch('/api/countdown/set', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endTime: endDate })
        });
        const data = await response.json();
        if (response.ok) {
            toast.success('Countdown updated to ' + new Date(data.endTime).toLocaleString());
        } else {
            toast.error('Error updating countdown: ' + data.message);
        }
    };

    return (
        <div>
            <h2>Set Countdown End Date and Time</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Select end date and time:</Form.Label>
                    <Form.Control type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </Form.Group>
                <Button onClick={handleSubmit}>Update Countdown</Button>
            </Form>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default CountDownAdmin;
