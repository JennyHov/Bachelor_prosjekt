import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import React from 'react';

export default function PrivateRoute({ children, requireAdmin = false }) {
    const { currentUser } = useSelector(state => state.user);
    // sjekker for å se om bruker er ikke-logged inn eller ikke en admin når det gjelder tilgangskontroll
    if (!currentUser || (requireAdmin && currentUser.role !== "admin")) {
        return <Navigate to="/" />;
    }

    // eller bare rendre barna  hvis brukeren er gyldig og har tilstrekkelige rettigheter
    return children;
}
