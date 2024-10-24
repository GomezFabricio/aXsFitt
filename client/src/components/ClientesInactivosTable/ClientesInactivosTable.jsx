import { Table } from 'react-bootstrap';

const ClientesInactivosTable = ({ clientes, onReactivarClick }) => {
    return (
        <Table striped bordered hover>
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
                        <td>{cliente.persona_fecha_nacimiento}</td>
                        <td>{cliente.persona_domicilio}</td>
                        <td>
                            <button onClick={() => onReactivarClick(cliente.cliente_id)} className="btn btn-primary btn-sm">
                                Reactivar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ClientesInactivosTable;