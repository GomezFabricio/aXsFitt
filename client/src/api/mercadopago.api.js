import axios from 'axios';

// Obtener el access token de Mercado Pago
const accessToken = 'TEST-1273741858627121-110320-a07c982b52b13f4ba280d44e47b5fbe9-250056888'; 

// Configuración del encabezado con el token de Mercado Pago
const config = {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
};

// API para crear una orden y generar el QR dinámico
export const crearOrdenQRRequest = async (data, userId, storeId, externalPosId) => {
    console.log('API: crearOrdenQRRequest', data);

    // Aquí reemplazamos las variables en la URL
    const url = `https://api.mercadopago.com/pos/${userId}/store/${storeId}/qr/${externalPosId}`;

    try {
        const response = await axios.post(url, data, config);
        console.log('Respuesta de Mercado Pago:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al crear el QR dinámico:', error);
        throw error;
    }
};
