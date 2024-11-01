import React from 'react';
import { Table } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const VentasListTable = ({ ventas, onVerDetalles }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Vendedor</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {ventas.map((venta) => (
                    <tr key={venta.venta_id}>
                        <td>{formatDate(venta.venta_fecha)}</td>
                        <td>{`${venta.clienteNombre} ${venta.clienteApellido}`}</td>
                        <td>{venta.vendedorNombre && venta.vendedorApellido ? `${venta.vendedorNombre} ${venta.vendedorApellido}` : ''}</td>
                        <td>{venta.venta_total}</td>
                        <td className="action-buttons">
                            <button onClick={() => onVerDetalles(venta.venta_id)} className="details-button btn btn-sm">
                                <i className="fas fa-eye icon"></i> Ver Detalles
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default VentasListTable;