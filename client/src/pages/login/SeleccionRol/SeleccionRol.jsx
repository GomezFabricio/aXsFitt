import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RolCard from '../../../components/RolCard/RolCard';
import { getRolesByUserIdRequest } from '../../../api/usuarios.api'; 
import { getMenuByRole } from '../../../api/login.api';
import { jwtDecode } from 'jwt-decode'; 
import './SeleccionRol.css';

const SeleccionRol = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchRoles = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token); // Uso correcto
                    const userId = decodedToken.userId;

                    console.log('Token decodificado:', decodedToken);
                    console.log('User ID:', userId);

                    // Obtener los roles del usuario desde el servidor
                    const response = await getRolesByUserIdRequest(userId);
                    console.log('Respuesta de la API:', response.data);
                    setRoles(response.data);

                    // Redirigir automáticamente si hay un solo rol
                    if (response.data.length === 1) {
                        handleRolClick(response.data[0].rol_id);
                    }
                } catch (err) {
                    console.error('Error al obtener los roles:', err);
                    setError('Error al obtener los roles. Intenta nuevamente.');
                } finally {
                    setLoading(false); // Finalizar carga
                }
            } else {
                setError('No se encontró el token. Por favor, inicia sesión nuevamente.');
                setLoading(false); // Finalizar carga
            }
        };

        fetchRoles();
    }, []);

    const handleRolClick = async (rolId) => {
        try {
            // Obtener el menú para el rol seleccionado
            const response = await getMenuByRole({ rolId }); // Enviar el rolId
            const menuOptions = response.data.menu;
    
            // Almacenar el menú en localStorage
            localStorage.setItem('menuOptions', JSON.stringify(menuOptions));
    
            // Navegar según el rol
            switch (rolId) {
                case 1: 
                    navigate('/vendedores');
                    break;
                case 2: 
                    navigate('*'); 
                    break;
                default:
                    navigate('/'); 
                    break;
            }
        } catch (error) {
            console.error('Error al obtener el menú:', error);
        }
    };

    if (loading) {
        return <div className="loading">Cargando...</div>; // Indicador de carga
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container-page">
            <h1>Selecciona tu Rol</h1>
            <div className="rol-cards">
                {roles && roles.length > 0 ? (
                    roles.map((rol) => (
                        <RolCard
                            key={rol.rol_id} 
                            rolNombre={rol.rol_tipo_rol}
                            onClick={() => handleRolClick(rol.rol_id)} // Enviar rolId al click
                        />
                    ))
                ) : (
                    <p>No hay roles disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default SeleccionRol;