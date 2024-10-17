import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';
import './InventarioList.css';

const InventarioList = ({ productos }) => {
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
                { title: "Producto", data: "Producto" },
                { title: "Tipo", data: "Tipo" },
                { title: "Marca", data: "Marca" },
                { title: "Cantidad", data: "Cantidad" },
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
                                    <a href="/productos/editar/${row.producto_id}">Editar</a>
                                </button>
                                <button>
                                    <a href="/productos/eliminar/${row.producto_id}">Eliminar</a>
                                </button>
                            </div>
                        `;
                    }
                }
            ]
        });
    }, [productos]);

    return (
        <table ref={tableRef} id="inventarioTable" className="display">
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
                {Array.isArray(productos) && productos.map((producto) => (
                    <tr key={producto.producto_id}>
                        <td>{producto.CodigoBarras}</td>
                        <td>{producto.Producto}</td>
                        <td>{producto.Tipo}</td>
                        <td>{producto.Marca}</td>
                        <td>{producto.Cantidad}</td>
                        <td>{producto.PrecioCosto}</td>
                        <td>{producto.PrecioVenta}</td>
                        <td>{producto.PrecioAfiliados}</td>
                        <td className="action-buttons">
                            <button>
                                <Link to={`/productos/editar/${producto.producto_id}`}>Editar</Link>
                            </button>
                            <button>
                                <Link to={`/productos/eliminar/${producto.producto_id}`}>Eliminar</Link>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InventarioList;