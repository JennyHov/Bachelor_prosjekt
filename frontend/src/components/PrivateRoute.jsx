import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import React from 'react';

// Legger til en parameter for å spesifisere om ruten krever admin-rettigheter
export default function PrivateRoute({ requireAdmin = false }) {
    const { currentUser } = useSelector((state) => state.user);

    // Sjekker først om brukeren er innlogget
    if (!currentUser) {
        return <Navigate to="/sign-in" />;
    }

    // Så, hvis ruten krever admin og den innloggede brukeren ikke er admin, omdirigerer
    if (requireAdmin && currentUser.role !== "admin") {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
