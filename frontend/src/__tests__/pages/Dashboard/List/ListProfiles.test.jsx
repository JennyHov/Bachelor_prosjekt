import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListProfiles from '../../../../pages/Dashboard/List/ListProfiles';

describe('ListProfiles', () => {
    beforeEach(() => {
        global.fetch = jest.fn((url, options) => {
            switch (options.method) {
                case 'GET':
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve([
                            { _id: '1', fullName: 'Karsten Warholm', email: 'karsten@example.com', role: 'user' },
                            { _id: '2', fullName: 'Therese Johaug', email: 'therese@example.com', role: 'admin' }
                        ])
                    });
                case 'PATCH':
                    return Promise.resolve({
                        json: () => Promise.resolve({ message: 'Role updated successfully' })
                    });
                case 'DELETE':
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({ message: 'User deleted successfully' })
                    });
                default:
                    return Promise.reject(new Error('Method not supported'));
            }
        });
    });

    it('fetches profiles and displays them', async () => {
        render(<ListProfiles />);
        expect(await screen.findByText('Karsten Warholm')).toBeInTheDocument();
        expect(screen.getByText('Therese Johaug')).toBeInTheDocument();
    });

    it('changes user role', async () => {
        render(<ListProfiles />);
        await waitFor(() => fireEvent.click(screen.getAllByText('Change to Admin')[0]));

        expect(global.fetch).toHaveBeenCalledWith(`/api/admin/users/role`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ userId: '1', role: 'admin' })
        });
    });

    it('deletes a user', async () => {
        render(<ListProfiles />);
        await waitFor(() => fireEvent.click(screen.getAllByText('Delete')[0]));

        expect(global.fetch).toHaveBeenCalledWith(`/api/admin/users/1`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
    });

    it('filters profiles based on search query', async () => {
        render(<ListProfiles />);
        const searchInput = screen.getByPlaceholderText('Search by name...');
        fireEvent.change(searchInput, { target: { value: 'Karsten' } });

        await waitFor(() => {
            expect(screen.getByText('Karsten Warholm')).toBeInTheDocument();
            expect(screen.queryByText('Therese Johaug')).not.toBeInTheDocument();
        });
    });
});
