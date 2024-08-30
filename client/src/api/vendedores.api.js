import axios from 'axios';

export const getVendedoresRequest = async () => {
    return await axios.get('http://localhost:4000/vendedores');
};

export const createVendedorRequest = async (data) => {
    await axios.post('http://localhost:4000/vendedores', data);
};


