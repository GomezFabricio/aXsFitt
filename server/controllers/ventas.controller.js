import ExcelJS from 'exceljs';
import { pool } from '../db.js';

/* -------------------------------------------------------------------------- */
/*                          PROCESAR PAGO EN EFECTIVO                         */
/* -------------------------------------------------------------------------- */
export const procesarPagoEfectivo = async (req, res) => {
    const { clienteId, productos, total } = req.body;
    const { personaId } = req.user; // Obtener personaId del token JWT

    // Validación de datos de entrada
    if (!productos || !total) {
        return res.status(400).json({ message: 'Datos de pago incompletos.' });
    }

    try {
        // Verificar si la persona es un vendedor
        const [vendedor] = await pool.query(
            `SELECT vendedor_id FROM vendedores WHERE persona_id = ?`,
            [personaId]
        );

        const vendedorId = vendedor.length > 0 ? vendedor[0].vendedor_id : null;

        // Registrar la venta en la tabla 'ventas'
        const [ventaResult] = await pool.query(
            `INSERT INTO ventas (cliente_id, vendedor_id, venta_fecha, venta_total)
            VALUES (?, ?, NOW(), ?)`,
            [clienteId || null, vendedorId, total]
        );

        const ventaId = ventaResult.insertId;

        // Registrar los detalles de la venta en la tabla 'detalle_venta'
        for (const producto of productos) {
            const { inventarioId, cantidad, precioUnitario, subtotal } = producto;
            await pool.query(
                `INSERT INTO detalle_venta (inventario_id, ventas_id, detalle_venta_cantidad, detalle_venta_precio_unitario, detalle_venta_subtotal)
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

        // Crear el comprobante de pago en efectivo
        const comprobanteId = await crearComprobante(
            ventaId,
            1, // ID del método de pago en efectivo
            null, // No hay URL de comprobante para pagos en efectivo
            total
        );

        res.status(200).json({ message: 'Pago en efectivo registrado exitosamente', comprobanteId });
    } catch (error) {
        console.error('Error procesando el pago en efectivo:', error);
        res.status(500).json({ message: 'Ocurrió un error al procesar el pago en efectivo. Por favor, intenta nuevamente.' });
    }
};
/* -------------------------------------------------------------------------- */
/*                          OBTENER TODAS LAS VENTAS                          */
/* -------------------------------------------------------------------------- */
export const obtenerVentas = async (req, res) => {
    try {
        const [ventas] = await pool.query(
            `SELECT 
                v.ventas_id, 
                v.venta_fecha, 
                v.venta_total, 
                c.persona_nombre AS clienteNombre, 
                c.persona_apellido AS clienteApellido, 
                ven.persona_nombre AS vendedorNombre, 
                ven.persona_apellido AS vendedorApellido 
            FROM 
                ventas v
            LEFT JOIN clientes cl ON v.cliente_id = cl.cliente_id
            LEFT JOIN personas c ON cl.persona_id = c.persona_id
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
                v.ventas_id, 
                v.venta_fecha, 
                v.venta_total, 
                c.persona_nombre AS clienteNombre, 
                c.persona_apellido AS clienteApellido, 
                ven.persona_nombre AS vendedorNombre, 
                ven.persona_apellido AS vendedorApellido 
            FROM 
                ventas v
            LEFT JOIN clientes cl ON v.cliente_id = cl.cliente_id
            LEFT JOIN personas c ON cl.persona_id = c.persona_id
            LEFT JOIN vendedores vnd ON v.vendedor_id = vnd.vendedor_id
            LEFT JOIN personas ven ON vnd.persona_id = ven.persona_id
            WHERE v.ventas_id = ?`,
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
            WHERE dv.ventas_id = ?`,
            [id]
        );

        res.json({ ...venta[0], detalles });
    } catch (error) {
        console.error('Error en obtenerVentaPorId:', error);
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                          CREAR COMPROBANTE DE PAGO                         */
/* -------------------------------------------------------------------------- */
export const crearComprobante = async (ventaId, metodoPagoId, comprobanteUrl, monto) => {
    try {
        const [comprobanteResult] = await pool.query(
            `INSERT INTO comprobantes (ventas_id, metodo_pago_id, comprobante_url, comprobante_fecha, comprobante_monto)
            VALUES (?, ?, ?, NOW(), ?)`,
            [ventaId, metodoPagoId, comprobanteUrl, monto]
        );

        return comprobanteResult.insertId;
    } catch (error) {
        console.error('Error creando el comprobante:', error);
        throw error;
    }
};

/* -------------------------------------------------------------------------- */
/*                          GENERAR REPORTE DE VENTAS                         */
/* -------------------------------------------------------------------------- */
export const generarReporteVentas = async (req, res) => {
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
            JOIN clientes cl ON v.cliente_id = cl.cliente_id
            JOIN personas c ON cl.persona_id = c.persona_id
            LEFT JOIN vendedores vnd ON v.vendedor_id = vnd.vendedor_id
            LEFT JOIN personas ven ON vnd.persona_id = ven.persona_id`
        );

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte de Ventas');

        worksheet.columns = [
            { header: 'ID Venta', key: 'venta_id', width: 10 },
            { header: 'Fecha', key: 'venta_fecha', width: 15 },
            { header: 'Cliente', key: 'cliente', width: 25 },
            { header: 'Vendedor', key: 'vendedor', width: 25 },
            { header: 'Total', key: 'venta_total', width: 15 },
            { header: 'ID Detalle', key: 'detalle_id', width: 10 },
            { header: 'Cantidad', key: 'cantidad', width: 10 },
            { header: 'Precio Unitario', key: 'precio_unitario', width: 15 },
            { header: 'Subtotal', key: 'subtotal', width: 15 },
            { header: 'Producto', key: 'producto', width: 25 },
        ];

        for (const venta of ventas) {
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
                [venta.venta_id]
            );

            if (detalles.length > 0) {
                detalles.forEach((detalle, index) => {
                    worksheet.addRow({
                        venta_id: index === 0 ? venta.venta_id : '',
                        venta_fecha: index === 0 ? new Date(venta.venta_fecha).toLocaleDateString() : '',
                        cliente: index === 0 ? `${venta.clienteNombre} ${venta.clienteApellido}` : '',
                        vendedor: index === 0 ? (venta.vendedorNombre && venta.vendedorApellido ? `${venta.vendedorNombre} ${venta.vendedorApellido}` : '') : '',
                        venta_total: index === 0 ? venta.venta_total : '',
                        detalle_id: detalle.detalle_venta_id,
                        cantidad: detalle.detalle_venta_cantidad,
                        precio_unitario: detalle.detalle_venta_precio_unitario,
                        subtotal: detalle.detalle_venta_subtotal,
                        producto: detalle.productoDescripcion,
                    });
                });
            } else {
                worksheet.addRow({
                    venta_id: venta.venta_id,
                    venta_fecha: new Date(venta.venta_fecha).toLocaleDateString(),
                    cliente: `${venta.clienteNombre} ${venta.clienteApellido}`,
                    vendedor: venta.vendedorNombre && venta.vendedorApellido ? `${venta.vendedorNombre} ${venta.vendedorApellido}` : '',
                    venta_total: venta.venta_total,
                    detalle_id: '',
                    cantidad: '',
                    precio_unitario: '',
                    subtotal: '',
                    producto: '',
                });
            }
        }

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Reporte_Ventas.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error en generarReporteVentas:', error);
        res.status(500).json({ message: error.message });
    }
};