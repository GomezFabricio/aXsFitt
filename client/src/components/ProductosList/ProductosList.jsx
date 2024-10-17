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
                { title: "Marca Producto", data: "MarcaProducto" }
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
                </tr>
            </thead>
            <tbody>
                {Array.isArray(productos) && productos.map((producto) => (
                    <tr key={producto.CodigoBarras}>
                        <td>{producto.CodigoBarras}</td>
                        <td>{producto.Producto}</td>
                        <td>{producto.TipoProducto}</td>
                        <td>{producto.MarcaProducto}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductosList;