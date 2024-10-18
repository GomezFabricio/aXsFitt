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
                ip.inventario_precio_costo AS PrecioCosto,
                ip.inventario_precio_venta AS PrecioVenta,
                ip.inventario_precio_afiliado AS PrecioAfiliados
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
                p.producto_id AS idProducto,
                p.producto_codigo_barras AS CodigoBarras,
                p.producto_descripcion AS Producto,
                tp.tipo_producto_nombre AS TipoProducto,
                mp.marca_producto_nombre AS MarcaProducto
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
    const { codigoBarrasProducto, nombreProducto, idTipoProducto, idMarcaProducto } = req.body;

    try {
        // Insertar el producto en la tabla productos
        const [productoResult] = await pool.query(`
            INSERT INTO productos (producto_codigo_barras, producto_descripcion, tipo_producto_id, marca_producto_id)
            VALUES (?, ?, ?, ?)
        `, [codigoBarrasProducto, nombreProducto, idTipoProducto, idMarcaProducto]);

        console.log('Resultado de la inserción de producto:', productoResult);
        res.json({ message: 'Producto agregado exitosamente', id: productoResult.insertId });
    } catch (error) {
        console.error('Error en agregarProducto:', error);
        res.status(500).json({ message: error.message });
    }
};

// Agregar inventario
export const agregarInventario = async (req, res) => {
    console.log('Entrando a agregarInventario');
    const { productoId, cantidad, precioCosto, precioVenta, incremento } = req.body;

    try {
        let calculatedPrecioVenta = precioVenta;
        let calculatedIncremento = incremento;

        // Si el precio de venta no se proporciona, calcularlo usando el incremento porcentual
        if (!precioVenta && incremento) {
            calculatedPrecioVenta = precioCosto + (precioCosto * (incremento / 100));
        }

        // Si el precio de venta se proporciona pero no el incremento, calcular el incremento porcentual
        if (precioVenta && !incremento) {
            calculatedIncremento = ((precioVenta - precioCosto) / precioCosto) * 100;
        }

        // Calcular el precio de afiliado restando un 10% al precio de venta
        const precioAfiliado = calculatedPrecioVenta * 0.9;

        // Obtener la fecha actual
        const fechaActualizacion = new Date();

        // Insertar el inventario en la tabla inventario_principal
        const [inventarioResult] = await pool.query(`
            INSERT INTO inventario_principal (producto_id, inventario_cantidad, inventario_precio_costo, inventario_precio_venta, inventario_precio_afiliado, inventario_incremento, inventario_fecha_actualizacion)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [productoId, cantidad, precioCosto, calculatedPrecioVenta, precioAfiliado, calculatedIncremento, fechaActualizacion]);

        console.log('Resultado de la inserción de inventario:', inventarioResult);
        res.json({ message: 'Inventario agregado exitosamente', id: inventarioResult.insertId });
    } catch (error) {
        console.error('Error en agregarInventario:', error);
        res.status(500).json({ message: error.message });
    }
};