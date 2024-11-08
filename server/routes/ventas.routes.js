import { Router } from 'express';
import { 
    registrarVenta, 
    obtenerVentas, 
    obtenerVentaPorId, 
    generarReporteVentas,
    procesarPagoEfectivo, 
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

/* Procesar pago en efectivo */
router.post('/ventas/pago-efectivo', procesarPagoEfectivo);

export default router;