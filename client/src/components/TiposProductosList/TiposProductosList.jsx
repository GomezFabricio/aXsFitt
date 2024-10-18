import React, { useState } from 'react';
import './TiposProductosList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const TiposProductosList = ({ tiposProductos, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTiposProductos = tiposProductos.filter(item =>
        item.nombreTipoProducto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="tiposProductosTableContainer">
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            {Array.isArray(filteredTiposProductos) && filteredTiposProductos.length > 0 ? (
                <table id="tiposProductosTable" className="display">
                    <thead>
                        <tr>
                            <th>Tipo Producto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTiposProductos.map((tipoProducto) => (
                            <tr key={tipoProducto.idTipoProducto}>
                                <td>{tipoProducto.nombreTipoProducto}</td>
                                <td className="action-buttons">
                                    <button className="edit-button" onClick={() => onEdit(tipoProducto)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="delete-button" onClick={() => onDelete(tipoProducto.idTipoProducto)}>
                                        <i className="fas fa-trash-alt"></i>
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