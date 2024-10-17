import { pool } from '../db.js';

// Listar inventario con detalles
export const inventarioList = async (req, res) => {
    console.log('Entrando a inventarioList');
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
        console.log('Resultado de la consulta:', result);
        res.json(result);
    } catch (error) {
        console.error('Error en inventarioList:', error);
        res.status(500).json({ message: error.message });
    }
};

// Listar todas las marcas
export const marcasList = async (req, res) => {
    console.log('Entrando a marcasList');
    try {
        const [result] = await pool.query(`
            SELECT 
                marca_producto_id AS idMarcaProducto,
                marca_producto_nombre AS nombreMarcaProducto
            FROM marca_productos
        `);
        console.log('Resultado de la consulta de marcas:', result);
        res.json(result);
    } catch (error) {
        console.error('Error en marcasList:', error);
        res.status(500).json({ message: error.message });
    }
};

// Listar todos los tipos de productos
export const tiposProductosList = async (req, res) => {
    console.log('Entrando a tiposProductosList');
    try {
        const [result] = await pool.query(`
            SELECT 
                tipo_producto_id AS idTipoProducto,
                tipo_producto_nombre AS nombreTipoProducto
            FROM tipos_productos
        `);
        console.log('Resultado de la consulta de tipos de productos:', result);
        res.json(result);
    } catch (error) {
        console.error('Error en tiposProductosList:', error);
        res.status(500).json({ message: error.message });
    }
};

// Listar todos los productos con datos relevantes para el usuario
export const productosList = async (req, res) => {
    console.log('Entrando a productosList');
    try {
        const [result] = await pool.query(`
            SELECT 
                p.producto_codigo_barras AS CodigoBarras,
                p.producto_descripcion AS Producto,
                tp.tipo_producto_nombre AS TipoProducto,
                mp.marca_producto_nombre AS MarcaProducto,
                p.producto_precio_costo AS PrecioCosto,
                p.precio_venta AS PrecioVenta,
                p.precio_venta_afiliados AS PrecioAfiliados
            FROM productos p
            JOIN tipos_productos tp ON p.tipo_producto_id = tp.tipo_producto_id
            JOIN marca_productos mp ON p.marca_producto_id = mp.marca_producto_id
        `);
        console.log('Resultado de la consulta de productos:', result);
        res.json(result);
    } catch (error) {
        console.error('Error en productosList:', error);
        res.status(500).json({ message: error.message });
    }
};
// Agregar un tipo de producto
export const agregarTipoProducto = async (req, res) => {
    console.log('Entrando a agregarTipoProducto');
    const { nombreTipoProducto } = req.body;
    try {
        const [result] = await pool.query(`
            INSERT INTO tipos_productos (tipo_producto_nombre)
            VALUES (?)
        `, [nombreTipoProducto]);
        console.log('Resultado de la inserción de tipo de producto:', result);
        res.json({ message: 'Tipo de producto agregado exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error en agregarTipoProducto:', error);
        res.status(500).json({ message: error.message });
    }
};

// Agregar una marca
export const agregarMarca = async (req, res) => {
    console.log('Entrando a agregarMarca');
    const { nombreMarcaProducto } = req.body;
    try {
        const [result] = await pool.query(`
            INSERT INTO marca_productos (marca_producto_nombre)
            VALUES (?)
        `, [nombreMarcaProducto]);
        console.log('Resultado de la inserción de marca:', result);
        res.json({ message: 'Marca agregada exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error en agregarMarca:', error);
        res.status(500).json({ message: error.message });
    }
};

// Agregar un producto
export const agregarProducto = async (req, res) => {
    console.log('Entrando a agregarProducto');
    const { codigoBarrasProducto, nombreProducto, idTipoProducto, idMarcaProducto, precioCostoProducto, incremento, precioVentaProducto } = req.body;

    let precioVenta;
    let precioAfiliados;
    let incrementoCalculado;

    // Calcular el precio de venta y el incremento
    if (incremento !== undefined) {
        // Si el incremento está definido, calcular el precio de venta
        precioVenta = precioCostoProducto + (precioCostoProducto * (incremento / 100));
        incrementoCalculado = incremento;
    } else if (precioVentaProducto !== undefined) {
        // Si el precio de venta está definido, calcular el incremento
        precioVenta = precioVentaProducto;
        incrementoCalculado = ((precioVenta - precioCostoProducto) / precioCostoProducto) * 100;
    } else {
        return res.status(400).json({ message: 'Debe proporcionar el incremento o el precio de venta' });
    }

    // Calcular el precio de afiliados con un descuento del 10%
    precioAfiliados = precioVenta * 0.9;

    try {
        const [result] = await pool.query(`
            INSERT INTO productos (producto_codigo_barras, producto_descripcion, tipo_producto_id, marca_producto_id, producto_precio_costo, precio_venta, precio_venta_afiliados, incremento)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [codigoBarrasProducto, nombreProducto, idTipoProducto, idMarcaProducto, precioCostoProducto, precioVenta, precioAfiliados, incrementoCalculado]);
        console.log('Resultado de la inserción de producto:', result);
        res.json({ message: 'Producto agregado exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error en agregarProducto:', error);
        res.status(500).json({ message: error.message });
    }
};