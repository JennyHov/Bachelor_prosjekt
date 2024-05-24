import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';  
import '@testing-library/jest-dom';
import CountDownAdmin from '../../../../pages/Dashboard/CountDown/CountDown';

import { act } from 'react-dom/test-utils'; 


//  fetch metode, men den er global
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
    const input = screen.getByDisplayValue(""); 
    // får direkte ut input
    fireEvent.change(input, { target: { value: '2024-05-12T12:00' } });  
    
    expect(input.value).toBe('2024-05-12T12:00');  // sjekker input
  });

  it('this will submit the form and calls the API with correct data', async () => {
    render(<CountDownAdmin />);
    const input = screen.getByDisplayValue("");
    fireEvent.change(input, { target: { value: '2024-05-12T12:00' } });
    const button = screen.getByRole('button', { name: /update countdown/i });
  
    // wrapper for å sikre alle promise er løst
    await act(async () => {  
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
