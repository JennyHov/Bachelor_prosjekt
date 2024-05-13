import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';  // Remove act if not used directly
import '@testing-library/jest-dom';
import CountDownAdmin from '../../../pages/Dashboard/CountDown/CountDown';

import { act } from 'react-dom/test-utils'; // Import act


// Simulates successful fetch always
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ endTime: '2024-05-12T12:00:00' }),
    ok: true
  })
);

describe('CountDownAdmin', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders correctly', () => {
    render(<CountDownAdmin />);
    expect(screen.getByText(/set countdown end date and time/i)).toBeInTheDocument();
  });

  it('allows input of end date and time', () => {
    render(<CountDownAdmin />);
    const input = screen.getByDisplayValue(""); // Directly get the input
    fireEvent.change(input, { target: { value: '2024-05-12T12:00' } });  // Simplified to the essential action
    expect(input.value).toBe('2024-05-12T12:00');  // Directly check the result
  });

  it('this will submit the form and calls the API with correct data', async () => {
    render(<CountDownAdmin />);
    const input = screen.getByDisplayValue("");
    fireEvent.change(input, { target: { value: '2024-05-12T12:00' } });
    const button = screen.getByRole('button', { name: /update countdown/i });
  
    await act(async () => {  // Wrap in act to ensure all promises are resolved
      fireEvent.click(button);
    });
  
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/countdown/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endTime: '2024-05-12T12:00' })
    });
  });
});
