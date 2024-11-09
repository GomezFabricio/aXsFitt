import express from 'express';
import { procesarPagoMercadoPago } from '../controllers/ventas.controller.js';

const router = express.Router();

router.post('/webhook', async (req, res) => {
    const event = req.body;

    // Maneja el evento de pago
    if (event.type === 'payment') {
        const paymentData = event.data;
        console.log('Pago recibido:', paymentData);

        try {
            // Invoca la función para procesar el pago con Mercado Pago
            await procesarPagoMercadoPago(paymentData);
            res.sendStatus(200);  // Responde con un 200 OK para confirmar la recepción del webhook
        } catch (error) {
            console.error('Error procesando el pago con Mercado Pago:', error);
            res.sendStatus(500);  // Responde con un 500 Internal Server Error en caso de error
        }
    } else {
        res.sendStatus(400);  // Responde con un 400 Bad Request si el evento no es de tipo "payment"
    }
});

export default router;