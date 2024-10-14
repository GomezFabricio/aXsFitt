import React, { useEffect, useRef } from 'react';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';
import './MarcasList.css';

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
                            <button onclick="handleEdit(${row.idMarcaProducto})">Editar</button>
                            <button onclick="handleDelete(${row.idMarcaProducto})">Eliminar</button>
                        `;
                    }
                }
            ]
        });
    }, [marcas]);

    const handleEdit = (id) => {
        if (onEdit) onEdit(id);
    };

    const handleDelete = (id) => {
        if (onDelete) onDelete(id);
    };

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
                            <td>
                                <button onClick={() => handleEdit(marca.idMarcaProducto)}>Editar</button>
                                <button onClick={() => handleDelete(marca.idMarcaProducto)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MarcasList;