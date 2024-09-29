import React, { useEffect, useState } from 'react';
import { getUsuariosRequest } from '../../../api/usuarios.api';
import SearchInput, { createFilter } from 'react-search-input';
import UsuariosListTable from '../../../components/UsuariosList/UsuariosListTable';
import './UsuariosList.css';

const KEYS_TO_FILTERS = ['persona_nombre', 'persona_apellido', 'persona_dni', 'usuario_email']; // Campos a filtrar

const UsuariosList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function loadUsuarios() {
            const responseUsuarios = await getUsuariosRequest();
            setUsuarios(responseUsuarios.data);
        }
        loadUsuarios();
    }, []);

    const filteredUsuarios = usuarios.filter(createFilter(searchTerm, KEYS_TO_FILTERS)); // Filtramos los usuarios

    const handleAltaClick = () => {
        // Navegar a la página de alta de usuario
    };

    const handleBajaClick = () => {
        // Navegar a la página de baja de usuario
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Usuarios</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAltaClick}>
                        Dar de Alta
                    </button>
                    <button className="inactivos-button" onClick={handleBajaClick}>
                        Dar de Baja
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SearchInput
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '12px',
                        marginBottom: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '25px',
                    }}
                    placeholder="Buscar usuario..."
                    onChange={(term) => setSearchTerm(term)}
                />
            </div>

            <UsuariosListTable 
                usuarios={filteredUsuarios} // Pasamos los usuarios filtrados
                onEdit={() => {}}
                onBaja={() => {}}
            />
        </div>
    );
}

export default UsuariosList;