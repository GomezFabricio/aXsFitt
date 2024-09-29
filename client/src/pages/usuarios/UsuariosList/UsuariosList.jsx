//Necesito que generes una page en base a VendedoresList, en esta page se renderizara un componente que se llama UsuariosList, este componente se encargara de mostrar una lista de usuarios, para esto necesitas hacer una peticion a la API de usuarios que ya esta creada, la URL de la API es /api/usuarios, esta peticion te devolvera un array de objetos con la informacion de la tabla usuarios de la base de datos, los datos seran devueltos por la funcion getAllUsers de usuarios.controller.js mediante las rutas y la api

/* La consulta SQL que se ejecuta en la funcion getAllUsers es la siguiente: 

SELECT u.usuario_id, u.persona_id, p.persona_nombre, p.persona_apellido, u.usuario_email, u.estado_usuario_id, r.rol_tipo_rol
            FROM usuarios u
            JOIN personas p ON u.persona_id = p.persona_id
            JOIN usuarios_roles ur ON u.usuario_id = ur.usuario_id
            JOIN roles r ON ur.rol_id = r.rol_id
            WHERE u.estado_usuario_id = 1

*/

//Recuerda que la tabla sera un componente asi que solo haz la estructura de la tabla y obten los datos que te devuelve la API para pasarselos al componente, la pagina tambien debe contener dos botones uno para dar de alta un usuario y otro para dar de baja un usuario, estos botones deben tener sus manejadores como en VendedoresList

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
                    onChange={(e) => setSearchTerm(e)}
                />
            </div>

            <UsuariosListTable 
                usuarios={usuarios}
                onEdit={() => {}}
                onBaja={() => {}}
            />

        </div>
    );
}



