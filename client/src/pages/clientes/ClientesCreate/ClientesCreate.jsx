import React, { useState } from 'react';
import { createClienteRequest } from '../../../api/clientes.api';
import './ClientesCreate.css'; // Importa el archivo CSS

function ClientesCreate() {
    const [cliente, setCliente] = useState({
        nombre: '',
        email: ''
    });

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createClienteRequest(cliente);
        setCliente({ nombre: '', email: '' });
    };

    return (
        <div className="container-page">
            <h1 className="title">Alta Cliente</h1>
            <h2>Complete los campos para registrar un nuevo cliente.</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={cliente.nombre}
                    onChange={handleChange}
                    className="input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={cliente.email}
                    onChange={handleChange}
                    className="input"
                />
                <button type="submit" className="btn">Crear Cliente</button>
            </form>
        </div>
    );
}

export default ClientesCreate;
