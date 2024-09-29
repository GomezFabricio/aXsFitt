// ClientesEdit.jsx
import React, { useState, useEffect } from 'react';
import { getClienteRequest, updateClienteRequest } from '../../../api/clientes.api';
import { useParams, useNavigate } from 'react-router-dom';

function ClientesEdit() {
    const [cliente, setCliente] = useState({
        persona_nombre: '',
        persona_apellido: '',
        persona_dni: '',
        persona_telefono: '',
        persona_email: '',  
        cliente_fecha_afiliacion: '',
        estado_afiliacion_id: 1, 
    });

    const { id } = useParams();
    const navigate = useNavigate();

    // Cargar los datos del cliente
    useEffect(() => {
        async function loadCliente() {
            try {
                const response = await getClienteRequest(id);
                if (response && response.data) {
                    setCliente({
                        persona_nombre: response.data.persona_nombre,
                        persona_apellido: response.data.persona_apellido,
                        persona_dni: response.data.persona_dni,
                        persona_telefono: response.data.persona_telefono,
                        persona_email: response.data.usuario_email || '',  // Asegurarse de obtener el email
                        cliente_fecha_afiliacion: response.data.cliente_fecha_alta || '',
                        estado_afiliacion_id: response.data.estado_afiliacion_id || 1,
                    });
                } else {
                    console.error("No se encontraron datos del cliente");
                }
            } catch (error) {
                console.error("Error cargando el cliente:", error);
            }
        }
        loadCliente();
    }, [id]);

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    // Función para enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Preparar los datos para actualizar
            const updatedData = {
                persona_nombre: cliente.persona_nombre,
                persona_apellido: cliente.persona_apellido,
                persona_dni: cliente.persona_dni,
                persona_telefono: cliente.persona_telefono,
                persona_email: cliente.persona_email,
                estado_afiliacion_id: cliente.estado_afiliacion_id,
            };

            await updateClienteRequest(id, updatedData);  
            alert('Cliente actualizado correctamente');  
            navigate('/clientes');  
        } catch (error) {
            console.error("Error actualizando el cliente:", error);
        }
    };

    return (
        <div>
            <h1>Editar Cliente</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="persona_nombre"
                    placeholder="Nombre"
                    value={cliente.persona_nombre}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="persona_apellido"
                    placeholder="Apellido"
                    value={cliente.persona_apellido}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="persona_dni"
                    placeholder="DNI"
                    value={cliente.persona_dni}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="persona_telefono"
                    placeholder="Teléfono"
                    value={cliente.persona_telefono}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="persona_email"
                    placeholder="Email"
                    value={cliente.persona_email}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="cliente_fecha_afiliacion"
                    value={cliente.cliente_fecha_afiliacion || ''}  
                    onChange={handleChange}
                    disabled  // Deshabilitado si no es editable
                />
                <select
                    name="estado_afiliacion_id"
                    value={cliente.estado_afiliacion_id}
                    onChange={handleChange}
                >
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                </select>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
}

export default ClientesEdit;
