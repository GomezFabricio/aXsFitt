import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RolCard from '../../../components/RolCard/RolCard';
import { useUser } from '../../../context/UserContext'; // Importar el contexto
import { getMenuByRole } from '../../../api/login.api';
import './SeleccionRol.css';

const SeleccionRol = () => {
    const navigate = useNavigate();
    const { roles } = useUser(); // Obtener roles del contexto

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

    return (
        <div className="container-page">
            <h1>Selecciona tu Rol</h1>
            <div className="rol-cards">
                {roles && roles.length > 0 ? (
                    roles.map((rol) => (
                        <RolCard
                            key={rol.rolId} 
                            rolNombre={rol.rolNombre}
                            onClick={() => handleRolClick(rol.rolId)} // Enviar rolId al click
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
