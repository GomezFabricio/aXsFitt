import React, { useEffect, useState } from 'react';
import { getClientesRequest, deleteClienteRequest } from '../../../api/clientes.api';
import { useNavigate } from 'react-router-dom';
import './ClientesList.css';

function ClientesList() {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadClientes() {
          try {
            const response = await getClientesRequest();
            setClientes(response.data);
          } catch (error) {
            console.error('Error al cargar la lista de clientes:', error);
          }
        }
      
        loadClientes();
      }, []);
      

    // Función para cargar los clientes desde la API
    const loadClientes = async () => {
        try {
            const response = await getClientesRequest();
            console.log(response.data);  // Verificar los datos devueltos
            setClientes(response.data);
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        }
    };

    // Función para inactivar un cliente
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas inactivar este cliente?')) {
          try {
            const response = await deleteClienteRequest(id);
            
            if (response.status === 200) {
              console.log('Cliente inactivado con éxito');
              // Recargar la lista de clientes después de inactivar
              loadClientes();  
            } else {
              console.error('Error al inactivar cliente:', response);
            }
          } catch (error) {
            console.error('Error al inactivar cliente:', error);
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
                                Inactivar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientesList;
