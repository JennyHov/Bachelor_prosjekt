import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListCollaborateProfiles from '../../../../pages/Dashboard/List/ListCollaborateProfiles';
import { act } from 'react-dom/test-utils'; 

describe('ListCollaborateProfiles', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url, options) => {
      if (options.method === 'GET') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            {
              _id: '1',
              fullName: 'Ola Hansen',
              email: 'olahansen@uio.no',
              description: 'Professor in Physics',
              institution: 'UiO',
              category: 'Academic',
              role: 'Faculty'
            },
            {
              _id: '2',
              fullName: 'Kari Nordmann',
              email: 'kari@oslomet.no',
              description: 'Research Assistant in Urban Planning',
              institution: 'Oslomet',
              category: 'Academic',
              role: 'Researcher'
            },
            {
              _id: '3',
              fullName: 'Jo Nesbø',
              email: 'jonesbo@ntnu.no',
              description: 'Guest Lecturer in Creative Writing',
              institution: 'NTNU',
              category: 'Academic',
              role: 'Visiting Scholar'
            }
          ])
        });
      } else if (options.method === 'DELETE') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      });
    });
  });

  it('fetches profiles and displays them', async () => {
    await act(async () => {  
      render(<ListCollaborateProfiles />);
    });
    expect(await screen.findByText('Ola Hansen')).toBeInTheDocument();
    expect(screen.getByText('Kari Nordmann')).toBeInTheDocument();
    expect(screen.getByText('Jo Nesbø')).toBeInTheDocument();
  });

  it('opens and submits edit modal for Jo Nesbø', async () => {
    await act(async () => {
      render(<ListCollaborateProfiles />);
    });
    await waitFor(() => expect(screen.getAllByText('Edit')[2]).toBeInTheDocument());

    const editButtons = screen.getAllByText('Edit');
    await act(async () => {
      fireEvent.click(editButtons[2]); 
    });

    const saveButton = screen.getByText('Save Changes');
    fireEvent.change(screen.getByDisplayValue('Jo Nesbø'), { target: { value: 'Jo Nesbø Updated' } });

    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/admin/collaborate-profiles/3', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: '3',
        fullName: 'Jo Nesbø Updated',
        email: 'jonesbo@ntnu.no',
        description: 'Guest Lecturer in Creative Writing',
        institution: 'NTNU',
        category: 'Academic',
        role: 'Visiting Scholar'
      }),
      credentials: 'include',
    });
  });

  it('deletes a profile', async () => {
    await act(async () => {
        render(<ListCollaborateProfiles />);
    });
    const deleteButtons = screen.getAllByText('Delete'); 

    await act(async () => {
        fireEvent.click(deleteButtons[2]);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/admin/collaborate-profiles/3', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    });

    await waitFor(() => {
        expect(screen.queryByText('Jo Nesbø')).not.toBeInTheDocument();
    });
});

});
