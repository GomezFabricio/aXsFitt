import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]); // Estado para roles

    return (
        <UserContext.Provider value={{ user, setUser, roles, setRoles }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
