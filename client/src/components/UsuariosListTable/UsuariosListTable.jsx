import React from 'react';
import { Table } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const UsuariosListTable = ({ usuarios, onEdit, onBaja }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.usuario_id}>
                        <td>{usuario.persona_nombre}</td>
                        <td>{usuario.persona_apellido}</td>
                        <td>{usuario.persona_dni}</td>
                        <td>{usuario.usuario_email}</td>
                        <td>{usuario.roles.join(', ')}</td>
                        <td className="action-buttons">
                            <button onClick={() => onEdit(usuario.usuario_id)} className="edit-button btn btn-sm me-2">
                                <i className="fas fa-edit"></i>
                            </button>
                            <button onClick={() => onBaja(usuario.usuario_id)} className="delete-button btn btn-sm">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UsuariosListTable;