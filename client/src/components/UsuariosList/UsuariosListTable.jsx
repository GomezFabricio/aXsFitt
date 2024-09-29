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
                        <td>{usuario.rol_tipo_rol}</td>
                        <td>
                            <button onClick={() => onEdit(usuario.usuario_id)} className="btn-edit">
                                Editar
                            </button>
                            <button onClick={() => onBaja(usuario.usuario_id)} className="btn-delete">
                                Baja
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UsuariosListTable;