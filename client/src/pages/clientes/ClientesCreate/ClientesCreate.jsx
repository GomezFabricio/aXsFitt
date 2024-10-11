import React, { useState } from 'react';
import { createClienteRequest } from '../../../api/clientes.api';
import './ClientesCreate.css'; // Importa el archivo CSS

function ClientesCreate() {
    const [cliente, setCliente] = useState({
        persona_nombre: '',
        persona_apellido: '',
        persona_dni: '',
        persona_fecha_nacimiento: '', // Fecha de nacimiento del cliente
        persona_domicilio: '',
        persona_telefono: '',
        persona_email: '', // Campo para el correo
        usuario_pass: '', // Cambia a 'usuario_pass' para reflejar el backend
        estado_afiliacion_id: '',
        cliente_fecha_afiliacion: '' // Fecha de afiliación del cliente
    });

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createClienteRequest(cliente); // Enviar datos al backend
        setCliente({
            persona_nombre: '',
            persona_apellido: '',
            persona_dni: '',
            persona_fecha_nacimiento: '',
            persona_domicilio: '',
            persona_telefono: '',
            persona_email: '', // Resetear el campo de correo
            usuario_pass: '', // Resetear el campo de contraseña
            estado_afiliacion_id: '',
            cliente_fecha_afiliacion: ''
        });
    };

    return (
        <div className="container-page">
            <h1 className="title">Alta Cliente</h1>
            <h2>Complete los campos para registrar un nuevo cliente.</h2>
            <form onSubmit={handleSubmit} className="form">
                {/* Campos del cliente */}
                <input
                    type="text"
                    name="persona_nombre"
                    placeholder="Nombre"
                    value={cliente.persona_nombre}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    type="text"
                    name="persona_apellido"
                    placeholder="Apellido"
                    value={cliente.persona_apellido}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    type="text"
                    name="persona_dni"
                    placeholder="DNI"
                    value={cliente.persona_dni}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <label>Fecha de nacimiento del cliente</label> {/* Etiqueta aclaratoria */}
                <input
                    type="date"
                    name="persona_fecha_nacimiento"
                    value={cliente.persona_fecha_nacimiento}
                    onChange={handleChange}
                    className="input"
                />
                <input
                    type="text"
                    name="persona_domicilio"
                    placeholder="Domicilio"
                    value={cliente.persona_domicilio}
                    onChange={handleChange}
                    className="input"
                />
                <input
                    type="text"
                    name="persona_telefono"
                    placeholder="Teléfono"
                    value={cliente.persona_telefono}
                    onChange={handleChange}
                    className="input"
                />
                <input
                    type="email"
                    name="persona_email"
                    placeholder="Correo"
                    value={cliente.persona_email}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    type="password"
                    name="usuario_pass"
                    placeholder="Contraseña"
                    value={cliente.usuario_pass}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <select
                    name="estado_afiliacion_id"
                    value={cliente.estado_afiliacion_id}
                    onChange={handleChange}
                    className="input"
                    required
                >
                    <option value="">Seleccione el estado de afiliación</option>
                    <option value="1">Afiliado</option>
                    <option value="2">No Afiliado</option>
                </select>
                <label>Fecha de afiliación del cliente</label> {/* Etiqueta aclaratoria */}
                <input
                    type="date"
                    name="cliente_fecha_afiliacion"
                    value={cliente.cliente_fecha_afiliacion}
                    onChange={handleChange}
                    className="input"
                />
                <button type="submit" className="btn">Crear Cliente</button>
            </form>
        </div>
    );
}

export default ClientesCreate;
