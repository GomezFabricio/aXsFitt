import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';
import './ProductosList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const ProductosList = ({ productos }) => {
    const tableRef = useRef(null);
    const dataTableRef = useRef(null);

    useEffect(() => {
        if (dataTableRef.current) {
            dataTableRef.current.destroy(); // Destruir la instancia existente de DataTables
        }

        dataTableRef.current = $(tableRef.current).DataTable({
            data: productos,
            columns: [
                { title: "Código de Barras", data: "CodigoBarras" },
                { title: "Nombre Producto", data: "Producto" },
                { title: "Tipo Producto", data: "TipoProducto" },
                { title: "Marca Producto", data: "MarcaProducto" },
                {
                    title: "Acciones",
                    data: null,
                    render: (data, type, row) => {
                        return `
                            <div class="action-buttons">
                                <button class="edit-button">
                                    <a href="/productos/editar/${row.CodigoBarras}">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </button>
                                <button class="delete-button">
                                    <a href="/productos/eliminar/${row.CodigoBarras}">
                                        <i class="fas fa-trash-alt"></i>
                                    </a>
                                </button>
                            </div>
                        `;
                    }
                }
            ]
        });
    }, [productos]);

    return (
        <table ref={tableRef} id="productosTable" className="display">
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
                {Array.isArray(productos) && productos.map((producto) => (
                    <tr key={producto.CodigoBarras}>
                        <td>{producto.CodigoBarras}</td>
                        <td>{producto.Producto}</td>
                        <td>{producto.TipoProducto}</td>
                        <td>{producto.MarcaProducto}</td>
                        <td className="action-buttons">
                            <button className="edit-button">
                                <Link to={`/productos/editar/${producto.CodigoBarras}`}>
                                    <i className="fas fa-edit"></i>
                                </Link>
                            </button>
                            <button className="delete-button">
                                <Link to={`/productos/eliminar/${producto.CodigoBarras}`}>
                                    <i className="fas fa-trash-alt"></i>
                                </Link>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductosList;