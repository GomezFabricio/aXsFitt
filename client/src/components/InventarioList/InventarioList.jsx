import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'datatables.net-dt/css/dataTables.dataTables.css';
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