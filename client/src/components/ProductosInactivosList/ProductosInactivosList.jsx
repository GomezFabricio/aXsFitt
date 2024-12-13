import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const ProductosInactivosList = ({ productos, onReactivar }) => {
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
        <div className="overflow-x-auto">
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input mb-4 p-2 border border-gray-300 rounded"
            />
            {Array.isArray(filteredProductos) && filteredProductos.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Código de Barras</th>
                            <th className="px-4 py-2 border-b">Nombre Producto</th>
                            <th className="px-4 py-2 border-b">Tipo Producto</th>
                            <th className="px-4 py-2 border-b">Marca Producto</th>
                            <th className="px-4 py-2 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProductos.map((producto) => (
                            <tr key={producto.CodigoBarras}>
                                <td className="px-4 py-2 border-b">{producto.CodigoBarras}</td>
                                <td className="px-4 py-2 border-b">{producto.Producto}</td>
                                <td className="px-4 py-2 border-b">{producto.TipoProducto}</td>
                                <td className="px-4 py-2 border-b">{producto.MarcaProducto}</td>
                                <td className="px-4 py-2 border-b flex space-x-2">
                                    <button className="reactivar-button btn btn-sm" onClick={() => onReactivar(producto.idProducto)}>
                                        <i className="fas fa-check-circle icon"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos disponibles en los productos inactivos.</p>
            )}
        </div>
    );
};

export default ProductosInactivosList;