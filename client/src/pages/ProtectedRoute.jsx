import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                // Verifica el token con una solicitud al servidor
                const response = await axios.get('http://localhost:4000/verify-token', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Muestra un indicador de carga mientras se verifica la autenticación
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children; // Renderiza los hijos si el usuario está autenticado
};

export default ProtectedRoute;