import React, { useState, useEffect } from 'react';
import { getClienteRequest, updateClienteRequest } from '../../../api/clientes.api';
import { useParams, useNavigate } from 'react-router-dom';
import './ClientesEdit.css';

function ClientesEdit() {
    const [cliente, setCliente] = useState({
        persona_nombre: '',
        persona_apellido: '',
        persona_dni: '',
        persona_telefono: '',
        persona_email: '',
        cliente_fecha_alta: '',
        estado_afiliacion_id: 1
    });
    
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadCliente() {
            const response = await getClienteRequest(id);
            setCliente(response.data);
        }
        loadCliente();
    }, [id]);

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateClienteRequest(id, cliente);
        navigate('/clientes'); // Redirige a la lista de clientes tras la actualización
    };

    return (
        <div className="edit-form-container">
            <h1>Editar Cliente</h1>
            <form onSubmit={handleSubmit} className="edit-form">
                <input
                    type="text"
                    name="persona_nombre"
                    placeholder="Nombre"
                    value={cliente.persona_nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="persona_apellido"
                    placeholder="Apellido"
                    value={cliente.persona_apellido}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="persona_dni"
                    placeholder="DNI"
                    value={cliente.persona_dni}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="persona_telefono"
                    placeholder="Teléfono"
                    value={cliente.persona_telefono}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="persona_email"
                    placeholder="Email"
                    value={cliente.persona_email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="cliente_fecha_alta"
                    placeholder="Fecha de afiliación"
                    value={cliente.cliente_fecha_alta.split('T')[0]}
                    onChange={handleChange}
                    required
                />
                <select
                    name="estado_afiliacion_id"
                    value={cliente.estado_afiliacion_id}
                    onChange={handleChange}
                    required
                >
                    <option value={1}>Activo</option>
                    <option value={2}>Inactivo</option>
                </select>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
}

export default ClientesEdit;
