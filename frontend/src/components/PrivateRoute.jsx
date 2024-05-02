import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import React from 'react';

export default function PrivateRoute({ children, requireAdmin = false }) {
    const { currentUser } = useSelector(state => state.user);
    // check to see not-logged in or non-admin try to access
    if (!currentUser || (requireAdmin && currentUser.role !== "admin")) {
        return <Navigate to="/" />;
    }

    // Render children hvis brukeren er gyldig og har tilstrekkelige rettigheter
    return children;
}
