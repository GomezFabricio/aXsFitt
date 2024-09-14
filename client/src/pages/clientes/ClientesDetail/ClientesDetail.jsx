import React, { useEffect, useState } from 'react';
import { getClienteRequest } from '../../../api/clientes.api';
import { useParams } from 'react-router-dom';

function ClientesDetail() {
    const [cliente, setCliente] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function loadCliente() {
            const response = await getClienteRequest(id);
            setCliente(response.data);
        }
        loadCliente();
    }, [id]);

    return (
        <div>
            <h1>Detalle del Cliente</h1>
            <p>Nombre: {cliente.nombre}</p>
            <p>Email: {cliente.email}</p>
        </div>
    );
}

export default ClientesDetail;
