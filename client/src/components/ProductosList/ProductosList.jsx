import React, { useState } from 'react';
import './ProductosList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const ProductosList = ({ productos, onDelete, onEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProductos = productos.filter(item =>
        item.Producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.CodigoBarras.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.TipoProducto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.MarcaProducto.toLowerCase().includes(searchTerm.toLowerCase())
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
            {Array.isArray(filteredProductos) && filteredProductos.length > 0 ? (
                <table id="productosTable" className="display">
                    <thead>
                        <tr>
                            <th>Código de Barras</th>
                            <th>Nombre Producto</th>
                            <th>Tipo Producto</th>
                            <th>Marca Producto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProductos.map((producto) => (
                            <tr key={producto.CodigoBarras}>
                                <td>{producto.CodigoBarras}</td>
                                <td>{producto.Producto}</td>
                                <td>{producto.TipoProducto}</td>
                                <td>{producto.MarcaProducto}</td>
                                <td className="action-buttons">
                                    <button className="edit-button btn btn-sm me-2" onClick={() => onEdit(producto)}>
                                        <i className="fas fa-edit icon"></i>
                                    </button>
                                    <button className="delete-button btn btn-sm me-2" onClick={() => onDelete(producto.idProducto)}>
                                        <i className="fas fa-trash-alt icon"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos disponibles en los productos.</p>
            )}
        </div>
    );
};

export default ProductosList;