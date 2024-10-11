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
        persona_fecha_nacimiento: '',  // Nuevo campo
        usuario_pass: '',  // Nuevo campo para la contraseña
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
                    const fechaNacimiento = response.data.persona_fecha_nacimiento 
                        ? new Date(response.data.persona_fecha_nacimiento).toISOString().split('T')[0] 
                        : '';
                    
                    setCliente({
                        persona_nombre: response.data.persona_nombre,
                        persona_apellido: response.data.persona_apellido,
                        persona_dni: response.data.persona_dni,
                        persona_telefono: response.data.persona_telefono,
                        persona_email: response.data.usuario_email || '',
                        persona_fecha_nacimiento: fechaNacimiento,  // Convertir fecha al formato adecuado
                        usuario_pass: '',  // Dejar la contraseña vacía inicialmente
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
            // Asegúrate de enviar la fecha en el formato adecuado
            const updatedData = {
                persona_nombre: cliente.persona_nombre,
                persona_apellido: cliente.persona_apellido,
                persona_dni: cliente.persona_dni,
                persona_telefono: cliente.persona_telefono,
                persona_email: cliente.persona_email,
                persona_fecha_nacimiento: cliente.persona_fecha_nacimiento,  // Enviar la fecha en formato 'YYYY-MM-DD'
                usuario_pass: cliente.usuario_pass,
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
                    name="persona_fecha_nacimiento"
                    value={cliente.persona_fecha_nacimiento || ''}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="usuario_pass"
                    placeholder="Nueva contraseña (opcional)"
                    value={cliente.usuario_pass}
                    onChange={handleChange}
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
