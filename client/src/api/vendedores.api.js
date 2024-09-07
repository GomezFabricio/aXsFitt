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

