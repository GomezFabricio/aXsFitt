import { pool } from '../db.js';

// Crear un nuevo tipo de producto
export const createTipoProducto = async (req, res) => {
    const { tipo_producto_nombre } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO tipos_productos (tipo_producto_nombre) VALUES (?)', [tipo_producto_nombre]);
        res.json({ id: result.insertId, tipo_producto_nombre });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva marca de producto
export const createMarcaProducto = async (req, res) => {
    const { marca_producto_nombre } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO marca_productos (marca_producto_nombre) VALUES (?)', [marca_producto_nombre]);
        res.json({ id: result.insertId, marca_producto_nombre });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
    const { tipo_producto_id, marca_producto_id, producto_descripcion, producto_codigo_barras, producto_precio_costo, producto_incremento, precio_venta, precio_venta_afiliados } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO productos (tipo_producto_id, marca_producto_id, producto_descripcion, producto_codigo_barras, producto_precio_costo, producto_incremento, precio_venta, precio_venta_afiliados) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [tipo_producto_id, marca_producto_id, producto_descripcion, producto_codigo_barras, producto_precio_costo, producto_incremento, precio_venta, precio_venta_afiliados]
        );
        res.json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Registrar stock de un producto
export const registerStock = async (req, res) => {
    const { producto_id, inventario_cantidad, inventario_fecha_actualizacion } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO inventario_principal (producto_id, inventario_cantidad, inventario_fecha_actualizacion) VALUES (?, ?, ?)',
            [producto_id, inventario_cantidad, inventario_fecha_actualizacion]
        );
        res.json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Editar un producto
export const editProducto = async (req, res) => {
    const { producto_id } = req.params;
    const { tipo_producto_id, marca_producto_id, producto_descripcion, producto_codigo_barras, producto_precio_costo, producto_incremento, precio_venta, precio_venta_afiliados } = req.body;
    try {
        await pool.query(
            'UPDATE productos SET tipo_producto_id = ?, marca_producto_id = ?, producto_descripcion = ?, producto_codigo_barras = ?, producto_precio_costo = ?, producto_incremento = ?, precio_venta = ?, precio_venta_afiliados = ? WHERE producto_id = ?',
            [tipo_producto_id, marca_producto_id, producto_descripcion, producto_codigo_barras, producto_precio_costo, producto_incremento, precio_venta, precio_venta_afiliados, producto_id]
        );
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
    const { producto_id } = req.params;
    try {
        await pool.query('DELETE FROM productos WHERE producto_id = ?', [producto_id]);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Listar todos los productos
export const listProductos = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM productos');
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Agregar stock a un producto existente
export const addStock = async (req, res) => {
    const { producto_id, cantidad } = req.body;
    try {
        await pool.query('UPDATE inventario_principal SET inventario_cantidad = inventario_cantidad + ? WHERE producto_id = ?', [cantidad, producto_id]);
        res.json({ message: 'Stock agregado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reducir stock de un producto existente
export const reduceStock = async (req, res) => {
    const { producto_id, cantidad } = req.body;
    try {
        await pool.query('UPDATE inventario_principal SET inventario_cantidad = inventario_cantidad - ? WHERE producto_id = ?', [cantidad, producto_id]);
        res.json({ message: 'Stock reducido' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Listar inventario con detalles
export const inventarioList = async (req, res) => {
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
                p.precio_venta * 0.9 AS PrecioAfiliados
            FROM productos p
            JOIN tipos_productos tp ON p.tipo_producto_id = tp.tipo_producto_id
            JOIN marca_productos mp ON p.marca_producto_id = mp.marca_producto_id
            JOIN inventario_principal ip ON p.producto_id = ip.producto_id
        `);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};