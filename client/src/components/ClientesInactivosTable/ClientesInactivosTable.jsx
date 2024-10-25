import { Table } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const ClientesInactivosTable = ({ clientes, onReactivarClick }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

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
                        <td>{formatDate(cliente.persona_fecha_nacimiento)}</td>
                        <td>{cliente.persona_domicilio}</td>
                        <td className="action-buttons">
                            <button onClick={() => onReactivarClick(cliente.cliente_id)} className="reingreso-button btn btn-sm">
                                <i className="fas fa-check"></i> Reactivar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ClientesInactivosTable;