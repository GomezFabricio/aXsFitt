import { pool } from '../db.js';

// Listar inventario con detalles
export const inventarioList = async (req, res) => {
    console.log('Entrando a inventarioList'); // Log para verificar que la función se está llamando
    try {
        const [result] = await pool.query(`
            SELECT 
                p.producto_codigo_barras AS CodigoBarras,
                p.producto_descripcion AS Producto,
                tp.tipo_producto_nombre AS Tipo,
                mp.marca_producto_nombre AS Marca,
                ip.inventario_cantidad AS Cantidad,
                p.producto_precio_costo AS PrecioCosto,
                p.precio_venta AS PrecioVenta,
                p.precio_venta_afiliados AS PrecioAfiliados
            FROM productos p
            JOIN tipos_productos tp ON p.tipo_producto_id = tp.tipo_producto_id
            JOIN marca_productos mp ON p.marca_producto_id = mp.marca_producto_id
            JOIN inventario_principal ip ON p.producto_id = ip.producto_id
        `);
        console.log('Resultado de la consulta:', result); // Log para verificar el resultado de la consulta
        res.json(result);
    } catch (error) {
        console.error('Error en inventarioList:', error); // Log para verificar el error
        res.status(500).json({ message: error.message });
    }
};

// Listar todas las marcas
export const marcasList = async (req, res) => {
    console.log('Entrando a marcasList'); // Log para verificar que la función se está llamando
    try {
        const [result] = await pool.query(`
            SELECT 
                marca_producto_id AS idMarcaProducto,
                marca_producto_nombre AS nombreMarcaProducto
            FROM marca_productos
        `);
        console.log('Resultado de la consulta de marcas:', result); // Log para verificar el resultado de la consulta
        res.json(result);
    } catch (error) {
        console.error('Error en marcasList:', error); // Log para verificar el error
        res.status(500).json({ message: error.message });
    }
};

// Listar todos los tipos de productos
export const tiposProductosList = async (req, res) => {
    console.log('Entrando a tiposProductosList'); // Log para verificar que la función se está llamando
    try {
        const [result] = await pool.query(`
            SELECT 
                tipo_producto_id AS idTipoProducto,
                tipo_producto_nombre AS nombreTipoProducto
            FROM tipos_productos
        `);
        console.log('Resultado de la consulta de tipos de productos:', result); // Log para verificar el resultado de la consulta
        res.json(result);
    } catch (error) {
        console.error('Error en tiposProductosList:', error); // Log para verificar el error
        res.status(500).json({ message: error.message });
    }
};

// Listar todos los productos
export const productosList = async (req, res) => {
    console.log('Entrando a productosList'); // Log para verificar que la función se está llamando
    try {
        const [result] = await pool.query(`
            SELECT 
                producto_id AS idProducto,
                producto_codigo_barras AS codigoBarrasProducto,
                producto_descripcion AS nombreProducto,
                tipo_producto_id AS idTipoProducto,
                marca_producto_id AS idMarcaProducto,
                producto_precio_costo AS precioCostoProducto,
                precio_venta AS precioVentaProducto,
                precio_venta_afiliados AS precioAfiliadosProducto
            FROM productos
        `);
        console.log('Resultado de la consulta de productos:', result); // Log para verificar el resultado de la consulta
        res.json(result);
    } catch (error) {
        console.error('Error en productosList:', error); // Log para verificar el error
        res.status(500).json({ message: error.message });
    }
};