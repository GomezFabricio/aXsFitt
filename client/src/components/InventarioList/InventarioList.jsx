import React, { useEffect, useRef } from 'react';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';
import './InventarioList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const InventarioList = ({ inventario, onDelete, onEdit, onReingreso }) => {
    const tableRef = useRef(null);
    const dataTableRef = useRef(null);

    useEffect(() => {
        if (dataTableRef.current) {
            dataTableRef.current.destroy(); // Destruir la instancia existente de DataTables
        }

        dataTableRef.current = $(tableRef.current).DataTable({
            data: inventario,
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
                                <button class="edit-button" data-id="${row.idProducto}">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="delete-button" data-id="${row.idProducto}">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                                <button class="reingreso-button" data-id="${row.idProducto}">
                                    <i class="fas fa-plus-circle"></i>
                                </button>
                            </div>
                        `;
                    }
                }
            ]
        });

        // Manejar eventos de clic en los botones de editar, eliminar y reingreso
        const handleEditClick = function () {
            const id = $(this).data('id');
            onEdit(id);
        };

        const handleDeleteClick = function () {
            const id = $(this).data('id');
            onDelete(id);
        };

        const handleReingresoClick = function () {
            const id = $(this).data('id');
            onReingreso(id);
        };

        $(tableRef.current).on('click', '.edit-button', handleEditClick);
        $(tableRef.current).on('click', '.delete-button', handleDeleteClick);
        $(tableRef.current).on('click', '.reingreso-button', handleReingresoClick);

        return () => {
            $(tableRef.current).off('click', '.edit-button', handleEditClick);
            $(tableRef.current).off('click', '.delete-button', handleDeleteClick);
            $(tableRef.current).off('click', '.reingreso-button', handleReingresoClick);
        };
    }, [inventario, onDelete, onEdit, onReingreso]);

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
                {Array.isArray(inventario) && inventario.map((item) => (
                    <tr key={item.CodigoBarras}>
                        <td>{item.CodigoBarras}</td>
                        <td>{item.Producto}</td>
                        <td>{item.Tipo}</td>
                        <td>{item.Marca}</td>
                        <td>{item.Cantidad}</td>
                        <td>{item.PrecioCosto}</td>
                        <td>{item.PrecioVenta}</td>
                        <td>{item.PrecioAfiliados}</td>
                        <td className="action-buttons">
                            <button className="edit-button" onClick={() => onEdit(item.idProducto)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="delete-button" onClick={() => onDelete(item.idProducto)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                            <button className="reingreso-button" onClick={() => onReingreso(item.idProducto)}>
                                <i className="fas fa-plus-circle"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InventarioList;