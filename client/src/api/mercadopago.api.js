import axios from 'axios';

// Obtener el token desde el almacenamiento local
const token = localStorage.getItem('token');

// Configuración del encabezado con el token
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
};

export const crearOrdenQRRequest = async (data, userId, externalPosId) => {
    console.log('API: crearOrdenQRRequest', data);

    try {
        const response = await axios.post('https://localhost:4000/mercadopago/crear-orden-qr', {
            data,
            userId,
            externalPosId
        }, config);
        console.log('Respuesta de Mercado Pago:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al crear el QR dinámico:', error.response ? error.response.data : error.message);
        throw error;
    }
};