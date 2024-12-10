import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const TiposProductosList = ({ tiposProductos, onDelete, onEdit }) => {
    return (
        <div className="overflow-x-auto">
            {Array.isArray(tiposProductos) && tiposProductos.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Nombre Tipo Producto</th>
                            <th className="px-4 py-2 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tiposProductos.map((tipoProducto) => (
                            <tr key={tipoProducto.idTipoProducto}>
                                <td className="px-4 py-2 border-b">{tipoProducto.nombreTipoProducto}</td>
                                <td className="px-4 py-2 border-b flex space-x-2">
                                    <button className="edit-button btn btn-sm" onClick={() => onEdit(tipoProducto)}>
                                        <i className="fas fa-edit icon"></i>
                                    </button>
                                    <button className="delete-button btn btn-sm" onClick={() => onDelete(tipoProducto.idTipoProducto)}>
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