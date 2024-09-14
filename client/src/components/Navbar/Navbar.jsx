import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMenuByRole } from '../../api/login.api';
import './NavBar.css';

const NavBar = () => {
    const [menuOptions, setMenuOptions] = useState([]);
    const [error, setError] = useState(null); // Estado para almacenar errores

    // Función para obtener las opciones del menú desde el backend
    const fetchMenuOptions = async () => {
        try {
            const response = await getMenuByRole(); // Usar la función importada
            console.log('Response data:', response.data); // Verificar qué datos recibes
            if (response.data && response.data.menu) {
                setMenuOptions(response.data.menu); // Guardar las opciones del menú en el estado
            } else {
                throw new Error('Formato de respuesta inesperado'); // Si la respuesta no tiene el formato esperado
            }
        } catch (error) {
            setError('No se pudieron cargar las opciones del menú'); // Almacenar un mensaje de error
        }
    };

    useEffect(() => {
        fetchMenuOptions(); // Llamamos a la función cuando el componente se monta
    }, []);

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
        </nav>
    );
};

export default NavBar;
