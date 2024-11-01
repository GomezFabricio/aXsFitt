import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';
import VentaDetallesModal from '../VentaDetallesModal/VentaDetallesModal';

const VentasListTable = ({ ventas, onVerDetalles, selectedVenta, setSelectedVenta }) => {
    const [modalShow, setModalShow] = useState(false);

    const handleVerDetallesClick = async (venta) => {
        await onVerDetalles(venta.venta_id);
        setModalShow(true);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
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
                                <button onClick={() => handleVerDetallesClick(venta)} className="details-button btn btn-sm">
                                    <i className="fas fa-eye icon"></i> Ver Detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {selectedVenta && (
                <VentaDetallesModal
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setSelectedVenta(null);
                    }}
                    venta={selectedVenta}
                />
            )}
        </>
    );
}

export default VentasListTable;