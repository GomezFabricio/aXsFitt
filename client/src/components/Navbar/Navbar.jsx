import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const [menuOptions, setMenuOptions] = useState([]);
    const [error, setError] = useState(null); // Estado para almacenar errores
    const navigate = useNavigate(); // Hook para navegar a otra página

    useEffect(() => {
        // Recuperar las opciones del menú desde localStorage
        const storedMenuOptions = localStorage.getItem('menuOptions');
        if (storedMenuOptions) {
            setMenuOptions(JSON.parse(storedMenuOptions)); // Guardar las opciones en el estado
        } else {
            setError('No hay opciones de menú disponibles'); // Almacenar un mensaje de error
        }
    }, []); // Solo se ejecuta al montar el componente

    // Función para manejar el click en "Cambiar Rol"
    const handleCambiarRol = () => {
        navigate('/seleccion-rol'); // Navegar a la página de cambiar rol
    };

    return (
        <nav className="navbar">
            {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error si ocurre */}
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
            {/* Botón Cambiar Rol */}
            <button className="cambiar-rol-button" onClick={handleCambiarRol}>
                Cambiar Rol
            </button>
        </nav>
    );
};

export default NavBar;
