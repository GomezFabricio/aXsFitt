import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import { getRolesByUserIdRequest } from '../../api/usuarios.api'; 

const NavBar = () => {
    const [menuOptions, setMenuOptions] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [roles, setRoles] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar la barra lateral
    const navigate = useNavigate();

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
        setDropdownVisible(!dropdownVisible);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Botón de hamburguesa */}
            <button
                onClick={toggleSidebar}
                className={`fixed top-4 left-4 z-30 text-white text-2xl bg-gray-800 p-2 rounded-full focus:outline-none transition-transform ${
                    isSidebarOpen ? 'translate-x-64' : 'translate-x-0'
                }`}
            >
                ☰
            </button>

            {/* Barra lateral */}
            <aside
                className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transition-transform transform z-20 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-4">
                    <h1 className="text-2xl font-bold">Mi Aplicación</h1>
                </div>
                <ul className="space-y-4 p-4">
                    {menuOptions.length > 0 ? (
                        menuOptions.map((option, index) => (
                            <li key={index} className="hover:bg-gray-700 rounded px-4 py-2 border border-gray-600">
                                <Link to={`/${option.toLowerCase().replace(/\s/g, '-')}`} className="text-white no-underline hover:text-gray-300">
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
                            <button
                                className="w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                                onClick={toggleDropdown}
                            >
                                {user.firstName} {user.lastName}
                            </button>
                            {dropdownVisible && (
                                <div className="mt-2 bg-gray-700 rounded p-2 space-y-2">
                                    <Link to="/mi-perfil" className="block text-white no-underline hover:text-gray-300">Mi perfil</Link>
                                    {roles.length > 1 && (
                                        <Link to="/seleccion-rol" className="block text-white no-underline hover:text-gray-300">Roles</Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left bg-red-500 rounded px-4 py-2 hover:bg-red-600"
                                    >
                                        Salir
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
};

export default NavBar;