import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';
import './ProductosList.css';

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
                { title: "ID Producto", data: "idProducto" },
                { title: "Código de Barras", data: "codigoBarrasProducto" },
                { title: "Nombre Producto", data: "nombreProducto" },
                { title: "ID Tipo Producto", data: "idTipoProducto" },
                { title: "ID Marca Producto", data: "idMarcaProducto" },
                { title: "Precio Costo", data: "precioCostoProducto" },
                { title: "Precio Venta", data: "precioVentaProducto" },
                { title: "Precio Afiliados", data: "precioAfiliadosProducto" },
                {
                    title: "Acciones",
                    data: null,
                    render: (data, type, row) => {
                        return `
                            <button>
                                <a href="/productos/editar/${row.idProducto}">Editar</a>
                            </button>
                            <button>
                                <a href="/productos/eliminar/${row.idProducto}">Eliminar</a>
                            </button>
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
                    <th>ID Producto</th>
                    <th>Código de Barras</th>
                    <th>Nombre Producto</th>
                    <th>ID Tipo Producto</th>
                    <th>ID Marca Producto</th>
                    <th>Precio Costo</th>
                    <th>Precio Venta</th>
                    <th>Precio Afiliados</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(productos) && productos.map((producto) => (
                    <tr key={producto.idProducto}>
                        <td>{producto.idProducto}</td>
                        <td>{producto.codigoBarrasProducto}</td>
                        <td>{producto.nombreProducto}</td>
                        <td>{producto.idTipoProducto}</td>
                        <td>{producto.idMarcaProducto}</td>
                        <td>{producto.precioCostoProducto}</td>
                        <td>{producto.precioVentaProducto}</td>
                        <td>{producto.precioAfiliadosProducto}</td>
                        <td>
                            <button>
                                <Link to={`/productos/editar/${producto.idProducto}`}>Editar</Link>
                            </button>
                            <button>
                                <Link to={`/productos/eliminar/${producto.idProducto}`}>Eliminar</Link>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductosList;