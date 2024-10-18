import React, { useEffect, useRef } from 'react';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';
import './MarcasList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const MarcasList = ({ marcas, onEdit, onDelete }) => {
    const tableRef = useRef(null);
    const dataTableRef = useRef(null);

    useEffect(() => {
        if (dataTableRef.current) {
            dataTableRef.current.destroy(); // Destruir la instancia existente de DataTables
        }

        dataTableRef.current = $(tableRef.current).DataTable({
            data: marcas,
            columns: [
                { title: "Marca Producto", data: "nombreMarcaProducto" },
                { 
                    title: "Acciones", 
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="action-buttons">
                                <button class="edit-button">
                                    <a href="/marcas/editar/${row.idMarcaProducto}">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </button>
                                <button class="delete-button">
                                    <a href="/marcas/eliminar/${row.idMarcaProducto}">
                                        <i class="fas fa-trash-alt"></i>
                                    </a>
                                </button>
                            </div>
                        `;
                    }
                }
            ]
        });
    }, [marcas]);

    return (
        <div id="marcasTableContainer">
            <table ref={tableRef} id="marcasTable" className="display">
                <thead>
                    <tr>
                        <th>Marca Producto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(marcas) && marcas.map((marca) => (
                        <tr key={marca.idMarcaProducto}>
                            <td>{marca.nombreMarcaProducto}</td>
                            <td className="action-buttons">
                                <button className="edit-button" onClick={() => onEdit(marca.idMarcaProducto)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="delete-button" onClick={() => onDelete(marca.idMarcaProducto)}>
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

export default MarcasList;