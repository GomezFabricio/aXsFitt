import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children; // Renderiza los hijos si hay un token
};

export default ProtectedRoute;
