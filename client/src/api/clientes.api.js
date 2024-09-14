import axios from 'axios';

export const getClientesRequest = async () => {
  return await axios.get('http://localhost:4000/clientes');
};

export const getClienteRequest = async (id) => {
  return await axios.get(`http://localhost:4000/clientes/${id}`);
};

export const createClienteRequest = async (data) => {
  await axios.post('http://localhost:4000/clientes', data);
};

export const updateClienteRequest = async (id, data) => {
  return await axios.put(`http://localhost:4000/clientes/${id}`, data);
};

export const deleteClienteRequest = async (id) => {
  return await axios.delete(`http://localhost:4000/clientes/${id}`);
};
