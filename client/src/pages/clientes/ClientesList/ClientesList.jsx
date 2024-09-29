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
            console.log(response.data);  // Verificar los datos devueltos
            setClientes(response.data);
        }
        loadClientes();
    }, []);

    // Función para eliminar un cliente
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            try {
                await deleteClienteRequest(id);
                setClientes(clientes.filter(cliente => cliente.cliente_id !== id));
            } catch (error) {
                console.error('Error al eliminar el cliente:', error);
            }
        }
    };
    

    return (
        <div className="clientes-list">
            <h1>Lista de Clientes</h1>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.cliente_id} className="cliente-item">
                        <div className="cliente-nombre">
                            {cliente.persona_nombre} {cliente.persona_apellido}
                        </div>
                        <div className="cliente-dni">DNI: {cliente.persona_dni}</div>
                        <div className="cliente-telefono">Teléfono: {cliente.persona_telefono}</div>
                        <div className="cliente-email">Email: {cliente.usuario_email}</div>
                        <div className="cliente-fecha-alta">Fecha de Afiliación: {new Date(cliente.cliente_fecha_alta).toLocaleDateString()}</div>
                        <div className="cliente-estado">Estado: {cliente.estado_afiliacion_id === 1 ? 'Activo' : 'Inactivo'}</div>
                        
                        <div className="cliente-actions">
                            <button onClick={() => navigate(`/clientes/edit/${cliente.cliente_id}`)} className="btn-edit">
                                Editar
                            </button>
                            <button onClick={() => handleDelete(cliente.cliente_id)} className="btn-delete">
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientesList;
