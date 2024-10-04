import axios from 'axios';

// Obtener el token desde el almacenamiento local
const token = localStorage.getItem('token');

// Configuración del encabezado con el token
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

export const getVendedoresRequest = async () => {
    return await axios.get('http://localhost:4000/vendedores', config);
};

export const getVendedorRequest = async (id) => {
    return await axios.get(`http://localhost:4000/vendedores/${id}`, config);
};

export const createVendedorRequest = async (data) => {
    console.log('Datos enviados a la API para crear vendedor:', data); // Agrega esta línea para depurar
    await axios.post('http://localhost:4000/vendedores', data, config);
};

export const deactivateVendedor = async (id) => {
    await axios.put(`http://localhost:4000/vendedores/${id}/baja`, null, config);
};

export const getVendedoresInactivosRequest = async () => {
    return await axios.get('http://localhost:4000/vendedores/inactivos', config);
};

export const activateVendedorRequest = async (id) => {
    return await axios.put(`http://localhost:4000/vendedores/${id}/activar`, null, config);
};

export const updateVendedorRequest = async (id, data) => {
    return await axios.put(`http://localhost:4000/vendedores/${id}`, data, config);
};