import { Table } from 'react-bootstrap';

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
                        <td>
                            <button onClick={() => onEdit(usuario.usuario_id)} className="btn btn-primary btn-sm me-2">
                                Editar
                            </button>
                            <button onClick={() => onBaja(usuario.usuario_id)} className="btn btn-danger btn-sm">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UsuariosListTable;