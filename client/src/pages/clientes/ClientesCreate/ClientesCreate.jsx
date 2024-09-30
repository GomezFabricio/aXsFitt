import React, { useState } from 'react';
import { createClienteRequest } from '../../../api/clientes.api';
import './ClientesCreate.css'; // Importa el archivo CSS

function ClientesCreate() {
    const [cliente, setCliente] = useState({
        persona_nombre: '',
        persona_apellido: '',
        persona_dni: '',
        persona_fecha_nacimiento: '',
        persona_domicilio: '',
        persona_telefono: '',
        estado_afiliacion_id: '',
        cliente_fecha_afiliacion: '',
        persona_email: '' // Nuevo campo para el correo
    });

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createClienteRequest(cliente);
        setCliente({
            persona_nombre: '',
            persona_apellido: '',
            persona_dni: '',
            persona_fecha_nacimiento: '',
            persona_domicilio: '',
            persona_telefono: '',
            estado_afiliacion_id: '',
            cliente_fecha_afiliacion: '',
            persona_email: '' // Resetear el campo de correo
        });
    };

    return (
        <div className="container-page">
            <h1 className="title">Alta Cliente</h1>
            <h2>Complete los campos para registrar un nuevo cliente.</h2>
            <form onSubmit={handleSubmit} className="form">
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
