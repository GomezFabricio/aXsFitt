import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Restaurar el estado del usuario desde localStorage (o null si no existe)
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [roles, setRoles] = useState(() => {
        // Restaurar los roles desde localStorage (o un array vacío si no existe)
        const savedRoles = localStorage.getItem('roles');
        return savedRoles ? JSON.parse(savedRoles) : [];
    });

    // Efecto para guardar el estado del usuario en localStorage cuando cambia
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Efecto para guardar los roles en localStorage cuando cambian
    useEffect(() => {
        if (roles.length > 0) {
            localStorage.setItem('roles', JSON.stringify(roles));
        } else {
            localStorage.removeItem('roles');
        }
    }, [roles]);

    return (
        <UserContext.Provider value={{ user, setUser, roles, setRoles }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
