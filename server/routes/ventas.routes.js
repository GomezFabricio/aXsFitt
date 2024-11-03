import { Router } from 'express';
import { 
    registrarVenta, 
    obtenerVentas, 
    obtenerVentaPorId, 
    actualizarVenta, 
    eliminarVenta,
    generarReporteVentas,
    procesarPagoMercadoPago
} from '../controllers/ventas.controller.js';

const router = Router();

/* Generar reporte de ventas */
router.get('/ventas/reporte', generarReporteVentas);

/* Registrar una nueva venta */
router.post('/ventas', registrarVenta);

/* Obtener todas las ventas */
router.get('/ventas', obtenerVentas);

/* Obtener una venta por su ID */
router.get('/ventas/:id', obtenerVentaPorId);

/* Actualizar una venta */
router.put('/ventas/:id', actualizarVenta);

/* Eliminar una venta */
router.delete('/ventas/:id', eliminarVenta);

/* Procesar pago con Mercado Pago */
router.post('/ventas/pago-mercadopago', procesarPagoMercadoPago);

export default router;