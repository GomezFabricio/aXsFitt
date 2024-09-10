import axios from 'axios';

export const getVendedoresRequest = async () => {
    return await axios.get('http://localhost:4000/vendedores');
};

export const getVendedorRequest = async (id) => {
    return await axios.get(`http://localhost:4000/vendedores/${id}`);
};

export const createVendedorRequest = async (data) => {
    await axios.post('http://localhost:4000/vendedores', data);
};

export const deactivateVendedor = async (id) => {
    await axios.put(`http://localhost:4000/vendedores/${id}/baja`);
};

export const getVendedoresInactivosRequest = async () => {
    return await axios.get('http://localhost:4000/vendedores/inactivos');
};

export const activateVendedorRequest = async (id) => {
    return await axios.put(`http://localhost:4000/vendedores/${id}/activar`);
};

export const updateVendedorRequest = async (data) => {
    return await axios.put(`http://localhost:4000/vendedores/${date.vendedor_id}`);
};