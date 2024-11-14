import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import { getRolesByUserIdRequest } from '../../api/usuarios.api'; 
import './NavBar.css';

const NavBar = () => {
    const [menuOptions, setMenuOptions] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Recuperar las opciones del menú desde localStorage
        const storedMenuOptions = localStorage.getItem('menuOptions');
        if (storedMenuOptions) {
            setMenuOptions(JSON.parse(storedMenuOptions));
        } else {
            setError('No hay opciones de menú disponibles');
        }

        // Recuperar el token desde localStorage y decodificarlo
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser({
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastName,
                });

                // Obtener los roles del usuario
                const fetchRoles = async () => {
                    try {
                        const response = await getRolesByUserIdRequest(decodedToken.userId);
                        setRoles(response.data);
                    } catch (err) {
                        console.error('Error al obtener los roles:', err);
                    }
                };

                fetchRoles();
            } catch (err) {
                console.error('Error al decodificar el token:', err);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('menuOptions');
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav className="navbar">
            {error && <p className="error">{error}</p>}
            <ul>
                {menuOptions.length > 0 ? (
                    menuOptions.map((option, index) => (
                        <li key={index}>
                            <Link to={`/${option.toLowerCase().replace(/\s/g, '-')}`}>
                                {option}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>Cargando opciones...</li>
                )}
            </ul>
            <div className="user-menu">
                {user && (
                    <div className="user-dropdown">
                        <button className="user-button" onClick={toggleDropdown}>
                            {user.firstName} {user.lastName}
                        </button>
                        {dropdownVisible && (
                            <div className="dropdown-content">
                                <Link to="/mi-perfil">Mi perfil</Link>
                                {roles.length > 1 && (
                                    <Link to="/seleccion-rol">Roles</Link>
                                )}
                                <button onClick={handleLogout}>Salir</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;