import React, { useState } from 'react';
import './InventarioList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const InventarioList = ({ inventario, onDelete, onEdit, onReingreso }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredInventario = inventario.filter(item =>
        item.Producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.CodigoBarras.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Marca.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            {Array.isArray(filteredInventario) && filteredInventario.length > 0 ? (
                <table id="inventarioTable" className="display">
                    <thead>
                        <tr>
                            <th>Código de Barras</th>
                            <th>Producto</th>
                            <th>Tipo</th>
                            <th>Marca</th>
                            <th>Cantidad</th>
                            <th>Precio Costo</th>
                            <th>Precio Venta</th>
                            <th>Precio Afiliados</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventario.map((item) => (
                            <tr key={item.CodigoBarras}>
                                <td>{item.CodigoBarras}</td>
                                <td>{item.Producto}</td>
                                <td>{item.Tipo}</td>
                                <td>{item.Marca}</td>
                                <td>{item.Cantidad}</td>
                                <td>{item.PrecioCosto}</td>
                                <td>{item.PrecioVenta}</td>
                                <td>{item.PrecioAfiliados}</td>
                                <td className="action-buttons">
                                    <button className="edit-button" onClick={() => onEdit(item.idProducto)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="delete-button" onClick={() => onDelete(item.idProducto)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <button className="reingreso-button" onClick={() => onReingreso(item.idProducto)}>
                                        <i className="fas fa-plus-circle"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos disponibles en el inventario.</p>
            )}
        </div>
    );
};

export default InventarioList;