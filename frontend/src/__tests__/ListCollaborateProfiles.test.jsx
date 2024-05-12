import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListCollaborateProfiles from '../pages/Dashboard/List/ListCollaborateProfiles';

describe('ListCollaborateProfiles', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url, options) => {
      if (options.method === 'GET') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            {
              _id: '1',
              fullName: 'John Doe',
              email: 'john@example.com',
              description: 'Researcher in AI',
              institution: 'NTNU',
              category: 'Academic',
              role: 'Student'
            }
          ])
        });
      } else if (options.method === 'DELETE') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})  // Sikre at alle mock paths returnerer en json funksjon
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})  // Generell fallback for andre HTTP metoder
      });
    });
  });
  
  it('fetches profiles and displays them', async () => {
    render(<ListCollaborateProfiles />);
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
  });

  it('opens and submits edit modal', async () => {
    render(<ListCollaborateProfiles />);
    await waitFor(() => fireEvent.click(screen.getByText('Edit')));
    const saveButton = screen.getByText('Save Changes');
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue('John Doe'), { target: { value: 'Jane Doe' } });
    fireEvent.click(saveButton);

    expect(global.fetch).toHaveBeenCalledWith('/api/admin/collaborate-profiles/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: '1',
        fullName: 'Jane Doe',
        email: 'john@example.com',
        description: 'Researcher in AI',
        institution: 'NTNU',
        category: 'Academic',
        role: 'Student'
      }),
      credentials: 'include',
    });
  });

  it('deletes a profile', async () => {
    render(<ListCollaborateProfiles />);
    await waitFor(() => fireEvent.click(screen.getByText('Delete')));

    expect(global.fetch).toHaveBeenCalledWith('/api/admin/collaborate-profiles/1', {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });

    await waitFor(() => expect(screen.queryByText('John Doe')).not.toBeInTheDocument());
  });
});
