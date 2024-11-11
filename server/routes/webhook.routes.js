import express from 'express';
import crypto from 'crypto';
import axios from 'axios';
import { procesarPagoMercadoPago } from '../controllers/ventas.controller.js';

const router = express.Router();
const SECRET_KEY = 'e84a7e3b804d617131ff35dae46ed923b0fa0b375da21af28f2f2e5057bfbeaa';

router.post('/webhook', express.json({ verify: (req, res, buf) => { req.rawBody = buf.toString(); } }), async (req, res) => {
    console.log('Webhook recibido');
    const event = req.body;

    const receivedSignature = req.headers['x-signature'];
    if (!receivedSignature) return res.sendStatus(400);

    const timestampPart = receivedSignature.match(/ts=(\d+)/)?.[1];
    const signaturePart = receivedSignature.match(/v1=([\w]+)/)?.[1];
    const body = req.rawBody;
    const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(timestampPart + body).digest('hex');

    if (signaturePart !== expectedSignature) return res.sendStatus(401);

    if (event.type === 'payment' || event.type === 'payment.created' || event.type === 'payment.updated') {
        try {
            const paymentId = event.data.id;
            const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: { Authorization: `TEST-1273741858627121-110320-a07c982b52b13f4ba280d44e47b5fbe9-250056888` }
            });
            const paymentDetails = response.data;
            
            console.log('Detalles del comprobante de pago:', paymentDetails);

            await procesarPagoMercadoPago(paymentDetails);
            res.sendStatus(200);
        } catch (error) {
            console.error('Error obteniendo detalles del comprobante:', error);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(400);
    }
});

export default router;
