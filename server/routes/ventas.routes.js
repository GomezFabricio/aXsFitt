import { Router } from 'express';
import { 
    registrarVenta, 
    obtenerVentas, 
    obtenerVentaPorId, 
    actualizarVenta, 
    eliminarVenta, 
    generarFactura 
} from '../controllers/ventas.controller.js';

const router = Router();

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

/* Generar una factura para una venta específica */
router.get('/ventas/:id/factura', generarFactura);

export default router;