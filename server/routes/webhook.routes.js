import express from 'express';
import crypto from 'crypto';
import { procesarPagoMercadoPago } from '../controllers/ventas.controller.js';

const router = express.Router();

// Clave secreta proporcionada por Mercado Pago
const SECRET_KEY = 'e84a7e3b804d617131ff35dae46ed923b0fa0b375da21af28f2f2e5057bfbeaa';

router.post('/webhook', express.json({ verify: (req, res, buf) => { req.rawBody = buf.toString(); } }), async (req, res) => {
    console.log('Webhook recibido');
    const event = req.body;

    // Verificar el contenido del evento
    console.log('Contenido del evento:', event);

    // Verificar todas las cabeceras de la solicitud
    console.log('Cabeceras de la solicitud:', req.headers);

    // Verificar la firma
    const receivedSignature = req.headers['x-signature'];
    if (!receivedSignature) {
        console.log('Firma no recibida');
        return res.sendStatus(400);  // Responde con un 400 Bad Request si la firma no está presente
    }

    console.log('Firma recibida:', receivedSignature);

    const [timestampPart, signaturePart] = receivedSignature.split(',').map(part => part.split('=')[1]);
    if (!timestampPart || !signaturePart) {
        console.log('Formato de firma inválido');
        return res.sendStatus(400);  // Responde con un 400 Bad Request si la firma no tiene el formato esperado
    }

    console.log('Partes de la firma:', { timestampPart, signaturePart });

    const body = req.rawBody;
    const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(timestampPart + body).digest('hex');

    console.log('Firma esperada:', expectedSignature);

    if (signaturePart !== expectedSignature) {
        console.log('Firma inválida');
        return res.sendStatus(401);  // Responde con un 401 Unauthorized si la firma es inválida
    }

    // Maneja el evento de pago
    if (event.type === 'payment' || event.type === 'payment.created' || event.type === 'payment.updated') {
        const paymentData = event.data;
        console.log('Pago recibido:', paymentData);

        try {
            // Invoca la función para procesar el pago con Mercado Pago
            await procesarPagoMercadoPago(paymentData);
            console.log('Pago procesado correctamente');
            res.sendStatus(200);  // Responde con un 200 OK para confirmar la recepción del webhook
        } catch (error) {
            console.error('Error procesando el pago con Mercado Pago:', error);
            res.sendStatus(500);  // Responde con un 500 Internal Server Error en caso de error
        }
    } else {
        console.log(`Evento no es de tipo "payment", "payment.created" o "payment.updated": ${event.type}`);
        res.sendStatus(400);  // Responde con un 400 Bad Request si el evento no es de tipo "payment"
    }
});

export default router;