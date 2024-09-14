import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RolCard from '../../../components/RolCard/RolCard';
import './SeleccionRol.css';

const SeleccionRol = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { roles } = location.state || {};  // Extraemos los roles del estado

    const handleRolClick = (rolId) => {
        navigate(`/vendedores`);
    };

    return (
        <div className="seleccion-rol-container">
            <h1>Selecciona tu Rol</h1>
            <div className="rol-cards">
                {roles && roles.length > 0 ? (
                    roles.map((rol) => (
                        <RolCard
                            key={rol.rolId}
                            rolNombre={rol.rolNombre}
                            onClick={() => handleRolClick(rol.rolId)}
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
