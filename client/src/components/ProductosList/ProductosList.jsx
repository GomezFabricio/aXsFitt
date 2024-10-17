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
                { title: "Código de Barras", data: "CodigoBarras" },
                { title: "Nombre Producto", data: "Producto" },
                { title: "Tipo Producto", data: "TipoProducto" },
                { title: "Marca Producto", data: "MarcaProducto" },
                { title: "Precio Costo", data: "PrecioCosto" },
                { title: "Precio Venta", data: "PrecioVenta" },
                { title: "Precio Afiliados", data: "PrecioAfiliados" },
                {
                    title: "Acciones",
                    data: null,
                    render: (data, type, row) => {
                        return `
                            <div class="action-buttons">
                                <button>
                                    <a href="/productos/editar/${row.CodigoBarras}">Editar</a>
                                </button>
                                <button>
                                    <a href="/productos/eliminar/${row.CodigoBarras}">Eliminar</a>
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
                    <th>Precio Costo</th>
                    <th>Precio Venta</th>
                    <th>Precio Afiliados</th>
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
                        <td>{producto.PrecioCosto}</td>
                        <td>{producto.PrecioVenta}</td>
                        <td>{producto.PrecioAfiliados}</td>
                        <td className="action-buttons">
                            <button>
                                <Link to={`/productos/editar/${producto.CodigoBarras}`}>Editar</Link>
                            </button>
                            <button>
                                <Link to={`/productos/eliminar/${producto.CodigoBarras}`}>Eliminar</Link>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductosList;