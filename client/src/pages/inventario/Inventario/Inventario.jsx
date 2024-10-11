import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

const InventarioList = ({ productos }) => {
    useEffect(() => {
        $(document).ready(function() {
            $('#inventarioTable').DataTable();
        });
    }, []);

    return (
        <table id="inventarioTable" className="display">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Cantidad</th>
                    <th>Precio Costo</th>
                    <th>Precio Venta</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto) => (
                    <tr key={producto.producto_id}>
                        <td>{producto.producto_descripcion}</td>
                        <td>{producto.tipo_producto_id}</td>
                        <td>{producto.marca_producto_id}</td>
                        <td>{producto.inventario_cantidad}</td>
                        <td>{producto.producto_precio_costo}</td>
                        <td>{producto.precio_venta}</td>
                        <td>
                            <button>
                                <Link to={`/productos/${producto.producto_id}`}>Detalle</Link>
                            </button>
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