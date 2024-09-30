import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuariosRequest, deactivateUsuario } from '../../../api/usuarios.api';
import SearchInput, { createFilter } from 'react-search-input';
import UsuariosListTable from '../../../components/UsuariosListTable/UsuariosListTable';
import './UsuariosList.css';

const KEYS_TO_FILTERS = ['persona_nombre', 'persona_apellido', 'persona_dni', 'usuario_email']; // Campos a filtrar

const UsuariosList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUsuarios() {
            const responseUsuarios = await getUsuariosRequest();
            const usuariosConRolesAgrupados = responseUsuarios.data.reduce((acc, usuario) => {
                const existingUser = acc.find(u => u.usuario_id === usuario.usuario_id);
                if (existingUser) {
                    existingUser.roles.push(usuario.rol_tipo_rol);
                } else {
                    acc.push({ ...usuario, roles: [usuario.rol_tipo_rol] });
                }
                return acc;
            }, []);
            setUsuarios(usuariosConRolesAgrupados);
        }
        loadUsuarios();
    }, []);

    const filteredUsuarios = usuarios.filter(createFilter(searchTerm, KEYS_TO_FILTERS)); // Filtramos los usuarios

    const handleAltaClick = () => {
        // Navegar a la página de alta de usuario
        navigate('/usuarios/alta');
    };

    const handleBajaClick = async (id) => {
        // Manejar la baja del usuario con el id proporcionado
        try {
            await deactivateUsuario(id);
            // Actualizar el estado de usuarios para eliminar el usuario de la lista
            setUsuarios((prevUsuarios) => prevUsuarios.filter(usuario => usuario.usuario_id !== id));
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    };

    const handleInactivosClick = () => {
        navigate('/usuarios/inactivos');
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Usuarios</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAltaClick}>
                        Agregar Usuario
                    </button>
                    <button className="inactivos-button" onClick={handleInactivosClick}>
                        Ver Inactivos
                    </button>
                </div>
            </div>

            <h2>En esta sección podrás ver y gestionar los usuarios activos.</h2>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SearchInput
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '12px',
                        marginBottom: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '25px',
                        fontSize: '16px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                    }}
                    placeholder="Buscar usuario..."
                    onChange={(term) => setSearchTerm(term)}
                />
            </div>

            <UsuariosListTable 
                usuarios={filteredUsuarios} // Pasamos los usuarios filtrados
                onEdit={() => {}}
                onBaja={handleBajaClick} // Pasamos la función handleBajaClick
            />
        </div>
    );
}

export default UsuariosList;