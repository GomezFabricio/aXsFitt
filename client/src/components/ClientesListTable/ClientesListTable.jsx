import React from 'react';
import { Table } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const ClientesListTable = ({ clientes, onEdit, onBaja }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (    
        <Table striped bordered hover className="clientes-table">
            <thead> 
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Teléfono</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Domicilio</th>
                    <th>Acciones</th>   
                </tr>
            </thead>
            <tbody>
                {clientes.map((cliente) => (
                    <tr key={cliente.cliente_id}>
                        <td>{cliente.persona_nombre}</td>
                        <td>{cliente.persona_apellido}</td>
                        <td>{cliente.persona_dni}</td>
                        <td>{cliente.persona_telefono}</td>
                        <td>{formatDate(cliente.persona_fecha_nacimiento)}</td>
                        <td>{cliente.persona_domicilio}</td>
                        <td className="action-buttons">
                            <button onClick={() => onEdit(cliente.cliente_id)} className="edit-button btn btn-sm me-2">
                                <i className="fas fa-edit"></i>
                            </button>
                            <button onClick={() => onBaja(cliente.cliente_id)} className="delete-button btn btn-sm me-2">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ClientesListTable;