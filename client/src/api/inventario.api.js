import axios from 'axios';

// Obtener el token desde el almacenamiento local
const token = localStorage.getItem('token');

// Configuración del encabezado con el token
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

// Función para listar inventario con detalles
export const inventarioList = async () => {
    try {
        const response = await axios.get('http://localhost:4000/inventario/inventario-list', config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};