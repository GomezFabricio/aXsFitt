import React from 'react';
import './TiposProductosList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const TiposProductosList = ({ tiposProductos, onDelete, onEdit }) => {
    return (
        <div>
            {Array.isArray(tiposProductos) && tiposProductos.length > 0 ? (
                <table id="tiposProductosTable" className="display">
                    <thead>
                        <tr>
                            <th>Nombre Tipo Producto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tiposProductos.map((tipoProducto) => (
                            <tr key={tipoProducto.idTipoProducto}>
                                <td>{tipoProducto.nombreTipoProducto}</td>
                                <td className="action-buttons">
                                    <button className="edit-button btn btn-sm me-2" onClick={() => onEdit(tipoProducto)}>
                                        <i className="fas fa-edit icon"></i>
                                    </button>
                                    <button className="delete-button btn btn-sm me-2" onClick={() => onDelete(tipoProducto.idTipoProducto)}>
                                        <i className="fas fa-trash-alt icon"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos disponibles en los tipos de productos.</p>
            )}
        </div>
    );
};

export default TiposProductosList;