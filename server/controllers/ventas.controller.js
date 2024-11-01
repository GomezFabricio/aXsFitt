import { pool } from '../db.js';

/* -------------------------------------------------------------------------- */
/*                          REGISTRAR UNA NUEVA VENTA                         */
/* -------------------------------------------------------------------------- */
export const registrarVenta = async (req, res) => {
    const { clienteId, productos, total } = req.body;
    const { personaId } = req.user; // Obtener personaId del token JWT

    try {
        // Verificar si la persona es un vendedor
        const [vendedor] = await pool.query(
            `SELECT vendedor_id FROM vendedores WHERE persona_id = ?`,
            [personaId]
        );

        const vendedorId = vendedor.length > 0 ? vendedor[0].vendedor_id : null;

        // Registrar la venta en la tabla 'ventas'
        const [ventaResult] = await pool.query(
            `INSERT INTO ventas (clientes_cliente_id, vendedor_id, venta_fecha, venta_total)
            VALUES (?, ?, NOW(), ?)`,
            [clienteId, vendedorId, total]
        );

        const ventaId = ventaResult.insertId;

        // Registrar los detalles de la venta en la tabla 'detalle_venta'
        for (const producto of productos) {
            const { inventarioId, cantidad, precioUnitario, subtotal } = producto;
            await pool.query(
                `INSERT INTO detalle_venta (inventario_id, venta_id, detalle_venta_cantidad, detalle_venta_precio_unitario, detalle_venta_subtotal)
                VALUES (?, ?, ?, ?, ?)`,
                [inventarioId, ventaId, cantidad, precioUnitario, subtotal]
            );

            // Actualizar la cantidad en el inventario
            await pool.query(
                `UPDATE inventario_principal
                SET inventario_cantidad = inventario_cantidad - ?
                WHERE inventario_id = ?`,
                [cantidad, inventarioId]
            );
        }

        res.json({ message: 'Venta registrada exitosamente', ventaId });
    } catch (error) {
        console.error('Error en registrarVenta:', error);
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                          OBTENER TODAS LAS VENTAS                          */
/* -------------------------------------------------------------------------- */
export const obtenerVentas = async (req, res) => {
    try {
        const [ventas] = await pool.query(
            `SELECT 
                v.venta_id, 
                v.venta_fecha, 
                v.venta_total, 
                c.persona_nombre AS clienteNombre, 
                c.persona_apellido AS clienteApellido, 
                ven.persona_nombre AS vendedorNombre, 
                ven.persona_apellido AS vendedorApellido 
            FROM 
                ventas v
            JOIN clientes cl ON v.clientes_cliente_id = cl.cliente_id
            JOIN personas c ON cl.persona_id = c.persona_id
            LEFT JOIN vendedores vnd ON v.vendedor_id = vnd.vendedor_id
            LEFT JOIN personas ven ON vnd.persona_id = ven.persona_id`
        );

        res.json(ventas);
    } catch (error) {
        console.error('Error en obtenerVentas:', error);
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                          OBTENER VENTA POR ID                              */
/* -------------------------------------------------------------------------- */
export const obtenerVentaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const [venta] = await pool.query(
            `SELECT 
                v.venta_id, 
                v.venta_fecha, 
                v.venta_total, 
                c.persona_nombre AS clienteNombre, 
                c.persona_apellido AS clienteApellido, 
                ven.persona_nombre AS vendedorNombre, 
                ven.persona_apellido AS vendedorApellido 
            FROM 
                ventas v
            JOIN clientes cl ON v.clientes_cliente_id = cl.cliente_id
            JOIN personas c ON cl.persona_id = c.persona_id
            LEFT JOIN vendedores vnd ON v.vendedor_id = vnd.vendedor_id
            LEFT JOIN personas ven ON vnd.persona_id = ven.persona_id
            WHERE v.venta_id = ?`,
            [id]
        );

        if (venta.length === 0) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        const [detalles] = await pool.query(
            `SELECT 
                dv.detalle_venta_id, 
                dv.detalle_venta_cantidad, 
                dv.detalle_venta_precio_unitario, 
                dv.detalle_venta_subtotal, 
                p.producto_descripcion AS productoDescripcion 
            FROM 
                detalle_venta dv
            JOIN inventario_principal ip ON dv.inventario_id = ip.inventario_id
            JOIN productos p ON ip.producto_id = p.producto_id
            WHERE dv.venta_id = ?`,
            [id]
        );

        res.json({ ...venta[0], detalles });
    } catch (error) {
        console.error('Error en obtenerVentaPorId:', error);
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                          ACTUALIZAR UNA VENTA                              */
/* -------------------------------------------------------------------------- */
export const actualizarVenta = async (req, res) => {
    const { id } = req.params;
    const { clienteId, vendedorId, productos, total } = req.body;

    try {
        // Actualizar la venta en la tabla 'venta'
        await pool.query(
            `UPDATE ventas
            SET clientes_cliente_id = ?, vendedor_id = ?, venta_total = ?
            WHERE venta_id = ?`,
            [clienteId, vendedorId, total, id]
        );

        // Eliminar los detalles de la venta existentes
        await pool.query(`DELETE FROM detalle_venta WHERE venta_id = ?`, [id]);

        // Registrar los nuevos detalles de la venta en la tabla 'detalle_venta'
        for (const producto of productos) {
            const { inventarioId, cantidad, precioUnitario, subtotal } = producto;
            await pool.query(
                `INSERT INTO detalle_venta (inventario_id, venta_id, detalle_venta_cantidad, detalle_venta_precio_unitario, detalle_venta_subtotal)
                VALUES (?, ?, ?, ?, ?)`,
                [inventarioId, id, cantidad, precioUnitario, subtotal]
            );

            // Actualizar la cantidad en el inventario
            await pool.query(
                `UPDATE inventario_principal
                SET inventario_cantidad = inventario_cantidad - ?
                WHERE inventario_id = ?`,
                [cantidad, inventarioId]
            );
        }

        res.json({ message: 'Venta actualizada exitosamente' });
    } catch (error) {
        console.error('Error en actualizarVenta:', error);
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                          ELIMINAR UNA VENTA                                */
/* -------------------------------------------------------------------------- */
export const eliminarVenta = async (req, res) => {
    const { id } = req.params;

    try {
        // Eliminar los detalles de la venta
        await pool.query(`DELETE FROM detalle_venta WHERE venta_id = ?`, [id]);

        // Eliminar la venta
        const [result] = await pool.query(`DELETE FROM ventas WHERE venta_id = ?`, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        res.json({ message: 'Venta eliminada exitosamente' });
    } catch (error) {
        console.error('Error en eliminarVenta:', error);
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                          GENERAR FACTURA                                   */
/* -------------------------------------------------------------------------- */
export const generarFactura = async (req, res) => {
    const { id } = req.params;

    try {
        const [venta] = await pool.query(
            `SELECT 
                v.venta_id, 
                v.venta_fecha, 
                v.venta_total, 
                c.persona_nombre AS clienteNombre, 
                c.persona_apellido AS clienteApellido, 
                ven.persona_nombre AS vendedorNombre, 
                ven.persona_apellido AS vendedorApellido 
            FROM 
                ventas v
            JOIN clientes cl ON v.clientes_cliente_id = cl.cliente_id
            JOIN personas c ON cl.persona_id = c.persona_id
            JOIN vendedores vnd ON v.vendedor_id = vnd.vendedor_id
            JOIN personas ven ON vnd.persona_id = ven.persona_id
            WHERE v.venta_id = ?`,
            [id]
        );

        if (venta.length === 0) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        const [detalles] = await pool.query(
            `SELECT 
                dv.detalle_venta_id, 
                dv.detalle_venta_cantidad, 
                dv.detalle_venta_precio_unitario, 
                dv.detalle_venta_subtotal, 
                p.producto_descripcion AS productoDescripcion 
            FROM 
                detalle_venta dv
            JOIN inventario_principal ip ON dv.inventario_id = ip.inventario_id
            JOIN productos p ON ip.producto_id = p.producto_id
            WHERE dv.venta_id = ?`,
            [id]
        );

        // Aquí puedes generar la factura en el formato que desees (PDF, HTML, etc.)
        // Por simplicidad, vamos a devolver los datos de la venta y los detalles en formato JSON

        res.json({ venta: venta[0], detalles });
    } catch (error) {
        console.error('Error en generarFactura:', error);
        res.status(500).json({ message: error.message });
    }
};