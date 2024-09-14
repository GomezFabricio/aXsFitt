import React, { useEffect, useState } from 'react';
import { getClientesRequest, deleteClienteRequest } from '../../../api/clientes.api';
import { useNavigate } from 'react-router-dom';
import './ClientesList.css';

function ClientesList() {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadClientes() {
            const response = await getClientesRequest();
            setClientes(response.data);
        }
        loadClientes();
    }, []);

    const handleDelete = async (id) => {
        await deleteClienteRequest(id);
        setClientes(clientes.filter(cliente => cliente.cliente_id !== id));
    };

    const handleEdit = (id) => {
        navigate(`/edit-cliente/${id}`);
    };

    return (
        <div className="clientes-list">
            <h1>Lista de Clientes</h1>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.cliente_id} className="cliente-item">
                        <div className="cliente-nombre">{cliente.persona_nombre} {cliente.persona_apellido}</div>
                        <div className="cliente-dni">DNI: {cliente.persona_dni}</div>
                        <div className="cliente-telefono">Teléfono: {cliente.persona_telefono}</div>
                        <div className="cliente-email">Email: {cliente.persona_email}</div>
                        <div className="cliente-estado">Estado: {cliente.estado_afiliacion_id === 1 ? 'Activo' : 'Inactivo'}</div>
                        <div className="cliente-fecha-alta">Fecha de afiliación: {new Date(cliente.cliente_fecha_alta).toLocaleDateString()}</div>
                        <div className="cliente-buttons">
                            <button onClick={() => handleEdit(cliente.cliente_id)} className="edit-button">Modificar</button>
                            <button onClick={() => handleDelete(cliente.cliente_id)} className="delete-button">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientesList;
