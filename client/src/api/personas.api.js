import axios from 'axios';

// Obtener el token desde el almacenamiento local
const token = localStorage.getItem('token');

// Configuración del encabezado con el token
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

export const checkDniExistsRequest = async (dni) => {
    console.log('Verificando DNI:', dni);
    try {
        const response = await axios.get(`https://localhost:4000/personas/check-dni/${dni}`, config);
        console.log('Respuesta recibida:', response.data);
        return response;
    } catch (error) {
        console.error('Error en checkDniExistsRequest:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message; // Lanzar el error con los datos de la respuesta
    }
};