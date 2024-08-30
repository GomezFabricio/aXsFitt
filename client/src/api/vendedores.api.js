import axios from 'axios';

export const createVendedorRequest = async (data) => {
    await axios.post('http://localhost:4000/vendedores', data);
};


