import React, { useEffect, useRef } from 'react';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';
import './TiposProductosList.css';

const TiposProductosList = ({ tiposProductos, onEdit, onDelete }) => {
    const tableRef = useRef(null);
    const dataTableRef = useRef(null);

    useEffect(() => {
        if (dataTableRef.current) {
            dataTableRef.current.destroy(); // Destruir la instancia existente de DataTables
        }

        dataTableRef.current = $(tableRef.current).DataTable({
            data: tiposProductos,
            columns: [
                { title: "Tipo Producto", data: "nombreTipoProducto" },
                { 
                    title: "Acciones", 
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <button onclick="handleEdit(${row.idTipoProducto})">Editar</button>
                            <button onclick="handleDelete(${row.idTipoProducto})">Eliminar</button>
                        `;
                    }
                }
            ]
        });
    }, [tiposProductos]);

    const handleEdit = (id) => {
        if (onEdit) onEdit(id);
    };

    const handleDelete = (id) => {
        if (onDelete) onDelete(id);
    };

    return (
        <div id="tiposProductosTableContainer">
            <table ref={tableRef} id="tiposProductosTable" className="display">
                <thead>
                    <tr>
                        <th>Tipo Producto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(tiposProductos) && tiposProductos.map((tipoProducto) => (
                        <tr key={tipoProducto.idTipoProducto}>
                            <td>{tipoProducto.nombreTipoProducto}</td>
                            <td>
                                <button onClick={() => handleEdit(tipoProducto.idTipoProducto)}>Editar</button>
                                <button onClick={() => handleDelete(tipoProducto.idTipoProducto)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TiposProductosList;