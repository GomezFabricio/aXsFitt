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
    return await axios.get('http://localhost:4000/usuarios', config);
};

export const getUsuarioRequest = async (id) => {
    return await axios.get(`http://localhost:4000/usuarios/${id}`, config);
};

export const createUsuarioRequest = async (data) => {
    await axios.post('http://localhost:4000/usuarios', data, config);
};

export const deactivateUsuario = async (id) => {
    await axios.put(`http://localhost:4000/usuarios/${id}/baja`, null, config);
};

export const getUsuariosInactivosRequest = async () => {
    return await axios.get('http://localhost:4000/usuarios/inactivos', config);
};

export const activateUsuarioRequest = async (id) => {
    return await axios.put(`http://localhost:4000/usuarios/${id}/activar`, null, config);
}

export const updateUsuarioRequest = async (id, data) => {
    return await axios.put(`http://localhost:4000/usuarios/${id}`, data, config);
};

export const getRolesRequest = async () => {
    return await axios.get('http://localhost:4000/roles', config);
};





