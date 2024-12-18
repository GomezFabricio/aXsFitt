import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getRolesByUserIdRequest } from '../../api/usuarios.api';

const NavBar = ({ isSidebarOpen, toggleSidebar }) => {
    const [menuOptions, setMenuOptions] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const storedMenuOptions = localStorage.getItem('menuOptions');
        if (storedMenuOptions) {
            setMenuOptions(JSON.parse(storedMenuOptions));
        } else {
            setError('No hay opciones de menú disponibles');
        }

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser({
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastName,
                });

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
        setDropdownVisible((prevState) => !prevState); // Cambia el estado al hacer clic
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuOptionClick = () => {
        if (isSidebarOpen) {
            toggleSidebar(); // Cierra el sidebar
        }
        setDropdownVisible(false); // Asegura que se cierre el dropdown
    };

    return (
        <div>
            {/* Header para dispositivos móviles y tablets */}
            <header className="flex lg:hidden justify-between items-center p-4 bg-gray-900 text-white">
                <button
                    onClick={toggleSidebar}
                    className={`text-2xl focus:outline-none z-50 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`}
                >
                    ☰
                </button>
            </header>

            {/* Menú lateral para móviles y tablets */}
            <aside
                className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 z-40 transition-transform transform lg:hidden ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Mi Aplicación</h1>
                    <button
                        onClick={toggleSidebar}
                        className="text-2xl focus:outline-none z-50"
                    >
                        ☰
                    </button>
                </div>
                <ul className="space-y-4 p-4">
                    {menuOptions.length > 0 ? (
                        menuOptions.map((option, index) => (
                            <li
                                key={index}
                                className="hover:bg-gray-700 px-4 py-3 border-b border-gray-600"
                            >
                                <Link
                                    to={`/${option.toLowerCase().replace(/\s/g, '-')}`}
                                    className="text-white no-underline hover:text-gray-300"
                                    onClick={handleMenuOptionClick}
                                >
                                    {option}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li>Cargando opciones...</li>
                    )}
                </ul>
                <div className="mt-auto p-4">
                    {user && (
                        <div>
                            <div className="w-full text-left px-4 py-2 bg-gray-700 rounded">
                                {user.firstName} {user.lastName}
                            </div>
                            <div className="mt-2 bg-gray-700 rounded p-2 space-y-2 z-50 relative">
                                <Link
                                    to="/mi-perfil"
                                    className="block text-white no-underline hover:text-gray-300"
                                    onClick={handleMenuOptionClick}
                                >
                                    Mi perfil
                                </Link>
                                {roles.length > 1 && (
                                    <Link
                                        to="/seleccion-rol"
                                        className="block text-white no-underline hover:text-gray-300"
                                        onClick={handleMenuOptionClick}
                                    >
                                        Roles
                                    </Link>
                                )}
                                <button
                                    onClick={() => { 
                                        handleLogout();
                                        handleMenuOptionClick();
                                    }}
                                    className="w-full text-left bg-red-500 rounded px-4 py-2 hover:bg-red-600"
                                >
                                    Salir
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Navbar para dispositivos de resolución superior */}
            <nav className="hidden lg:flex items-center justify-between bg-gray-800 text-white px-8 py-4">
                <div className="flex items-center space-x-8">
                    {menuOptions.length > 0 ? (
                        menuOptions.map((option, index) => (
                            <Link
                                key={index}
                                to={`/${option.toLowerCase().replace(/\s/g, '-')}`}
                                className="text-white no-underline hover:text-gray-300"
                                onClick={handleMenuOptionClick}
                            >
                                {option}
                            </Link>
                        ))
                    ) : (
                        <span>Cargando opciones...</span>
                    )}
                </div>
                {user && (
                    <div className="relative">
                        <button
                            className="text-white focus:outline-none"
                            onClick={toggleDropdown}
                        >
                            {user.firstName} {user.lastName}
                        </button>
                        {dropdownVisible && (
                            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-gray-700 rounded shadow-lg py-2 z-50">
                                <Link
                                    to="/mi-perfil"
                                    className="block px-4 py-2 text-white no-underline hover:bg-gray-600"
                                    onClick={handleMenuOptionClick}
                                >
                                    Mi perfil
                                </Link>
                                {roles.length > 1 && (
                                    <Link
                                        to="/seleccion-rol"
                                        className="block px-4 py-2 text-white no-underline hover:bg-gray-600"
                                        onClick={handleMenuOptionClick}
                                    >
                                        Roles
                                    </Link>
                                )}
                                <button
                                    onClick={() => { 
                                        handleLogout(); 
                                        handleMenuOptionClick(); 
                                    }}
                                    className="block w-full text-left px-4 py-2 text-white hover:bg-red-600"
                                >
                                    Salir
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default NavBar;
