import React, { useEffect, useState } from 'react';
import { getClientesRequest } from '../../../api/clientes.api';
import { useNavigate } from 'react-router-dom';
import './ClientesList.css';

function ClientesList() {
    const [clientesActivos, setClientesActivos] = useState([]);
    const [clientesInactivos, setClientesInactivos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadClientes() {
          try {
            const response = await getClientesRequest();
            const activos = response.data.filter(cliente => cliente.estado_afiliacion_id === 1);
            const inactivos = response.data.filter(cliente => cliente.estado_afiliacion_id !== 1);
            setClientesActivos(activos);
            setClientesInactivos(inactivos);
          } catch (error) {
            console.error('Error al cargar la lista de clientes:', error);
          }
        }
      
        loadClientes();
    }, []);

    return (
        <div className="clientes-container">
            <h1>Lista de Clientes</h1>

            <h2>Clientes Activos</h2>
            <div className="clientes-list">
                {clientesActivos.map(cliente => (
                    <div key={cliente.cliente_id} className="cliente-item">
                        <div className="cliente-nombre">
                            {cliente.persona_nombre} {cliente.persona_apellido}
                        </div>
                        <div className="cliente-dni">DNI: {cliente.persona_dni}</div>
                        <div className="cliente-telefono">Teléfono: {cliente.persona_telefono}</div>
                        <div className="cliente-email">Email: {cliente.usuario_email}</div>
                        <div className="cliente-fecha-alta">Fecha de Afiliación: {new Date(cliente.cliente_fecha_alta).toLocaleDateString()}</div>
                        <div className="cliente-estado">Estado: Activo</div>
                        <div className="cliente-actions">
                            <button onClick={() => navigate(`/clientes/edit/${cliente.cliente_id}`)} className="btn-edit">
                                <i className="fas fa-edit"></i> Editar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Clientes Inactivos</h2>
            <div className="clientes-list">
                {clientesInactivos.map(cliente => (
                    <div key={cliente.cliente_id} className="cliente-item">
                        <div className="cliente-nombre">
                            {cliente.persona_nombre} {cliente.persona_apellido}
                        </div>
                        <div className="cliente-dni">DNI: {cliente.persona_dni}</div>
                        <div className="cliente-telefono">Teléfono: {cliente.persona_telefono}</div>
                        <div className="cliente-email">Email: {cliente.usuario_email}</div>
                        <div className="cliente-fecha-alta">Fecha de Afiliación: {new Date(cliente.cliente_fecha_alta).toLocaleDateString()}</div>
                        <div className="cliente-estado">Estado: Inactivo</div>
                        <div className="cliente-actions">
                            <button onClick={() => navigate(`/clientes/edit/${cliente.cliente_id}`)} className="btn-edit">
                                <i className="fas fa-edit"></i> Editar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClientesList;
