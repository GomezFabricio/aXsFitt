import axios from 'axios';

// Obtener el token desde el almacenamiento local
const token = localStorage.getItem('token');

// Configuración del encabezado con el token
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

export const getUsuariosRequest = async () => {
    console.log('Enviando solicitud GET a /usuarios');
    const response = await axios.get('http://localhost:4000/usuarios', config);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const getUsuarioRequest = async (id) => {
    console.log(`Enviando solicitud GET a /usuarios/${id}`);
    const response = await axios.get(`http://localhost:4000/usuarios/${id}`, config);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const createUsuarioRequest = async (data) => {
    console.log('Enviando solicitud POST a /usuarios con datos:', data);
    const response = await axios.post('http://localhost:4000/usuarios', data, config);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const deactivateUsuario = async (id) => {
    console.log(`Enviando solicitud PUT a /usuarios/${id}/baja`);
    const response = await axios.put(`http://localhost:4000/usuarios/${id}/baja`, null, config);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const getUsuariosInactivosRequest = async () => {
    console.log('Enviando solicitud GET a /usuarios/inactivos');
    const response = await axios.get('http://localhost:4000/usuarios/inactivos', config);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const activateUsuarioRequest = async (id) => {
    console.log(`Enviando solicitud PUT a /usuarios/${id}/activar`);
    const response = await axios.put(`http://localhost:4000/usuarios/${id}/activar`, null, config);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const updateUsuarioRequest = async (id, data) => {
    console.log(`Enviando solicitud PUT a /usuarios/${id} con datos:`, data);
    const response = await axios.put(`http://localhost:4000/usuarios/${id}`, data, config);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const getRolesRequest = async () => {
    console.log('Enviando solicitud GET a /roles');
    const response = await axios.get('http://localhost:4000/roles', config);
    console.log('Respuesta recibida:', response.data);
    return response;
};