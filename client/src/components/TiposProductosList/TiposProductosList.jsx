import React, { useEffect, useRef } from 'react';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';
import './TiposProductosList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

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
                            <div class="action-buttons">
                                <button class="edit-button">
                                    <a href="/tipos-productos/editar/${row.idTipoProducto}">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </button>
                                <button class="delete-button">
                                    <a href="/tipos-productos/eliminar/${row.idTipoProducto}">
                                        <i class="fas fa-trash-alt"></i>
                                    </a>
                                </button>
                            </div>
                        `;
                    }
                }
            ]
        });
    }, [tiposProductos]);

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
                            <td className="action-buttons">
                                <button className="edit-button" onClick={() => onEdit(tipoProducto.idTipoProducto)}>
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
        </div>
    );
};

export default TiposProductosList;