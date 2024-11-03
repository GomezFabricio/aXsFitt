import axios from 'axios';

// Obtener el token desde el almacenamiento local
const token = localStorage.getItem('token');

// Configuración del encabezado con el token
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

// Registrar una nueva venta
export const registrarVentaRequest = async (data) => {
    console.log('Datos enviados a la API para registrar venta:', data);
    return await axios.post('http://localhost:4000/ventas', data, config);
};

// Obtener todas las ventas
export const obtenerVentasRequest = async () => {
    return await axios.get('http://localhost:4000/ventas', config);
};

// Obtener una venta por su ID
export const obtenerVentaPorIdRequest = async (id) => {
    return await axios.get(`http://localhost:4000/ventas/${id}`, config);
};

// Actualizar una venta
export const actualizarVentaRequest = async (id, data) => {
    console.log('Datos enviados a la API para actualizar venta:', data);
    return await axios.put(`http://localhost:4000/ventas/${id}`, data, config);
};

// Eliminar una venta
export const eliminarVentaRequest = async (id) => {
    return await axios.delete(`http://localhost:4000/ventas/${id}`, config);
};

// Descargar el reporte de ventas en formato Excel
export const descargarReporteVentasRequest = async () => {
    try {
        const response = await axios.get('http://localhost:4000/ventas/reporte', {
            responseType: 'blob',
            ...config,
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Reporte_Ventas.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error descargando el reporte de ventas:', error);
        throw error;
    }
};

// Procesar pago con Mercado Pago
export const procesarPagoMercadoPagoRequest = async (data) => {
    return await axios.post('http://localhost:4000/ventas/pago-mercadopago', data, config);
};

// Procesar pago en efectivo
export const procesarPagoEfectivoRequest = async (data) => {
    return await axios.post('http://localhost:4000/ventas/pago-efectivo', data, config);
};

// Procesar pago con tarjeta
export const procesarPagoTarjetaRequest = async (data) => {
    return await axios.post('http://localhost:4000/ventas/pago-tarjeta', data, config);
};