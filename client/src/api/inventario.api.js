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

// Función para listar todas las marcas
export const marcasList = async () => {
    try {
        const response = await axios.get('http://localhost:4000/inventario/marcas-list', config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para listar todos los tipos de productos
export const tiposProductosList = async () => {
    try {
        const response = await axios.get('http://localhost:4000/inventario/tipos-productos-list', config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para listar todos los productos
export const productosList = async () => {
    try {
        const response = await axios.get('http://localhost:4000/inventario/productos-list', config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar un tipo de producto
export const agregarTipoProducto = async (nombreTipoProducto) => {
    try {
        const response = await axios.post('http://localhost:4000/inventario/agregar-tipo-producto', { nombreTipoProducto }, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar una marca
export const agregarMarca = async (nombreMarcaProducto) => {
    try {
        const response = await axios.post('http://localhost:4000/inventario/agregar-marca', { nombreMarcaProducto }, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar un producto
export const agregarProducto = async (producto) => {
    try {
        const response = await axios.post('http://localhost:4000/inventario/agregar-producto', producto, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar inventario
export const agregarInventario = async (inventario) => {
    try {
        const response = await axios.post('http://localhost:4000/inventario/agregar-inventario', inventario, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para obtener inventario por ID
export const obtenerInventarioPorId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:4000/inventario/obtener-inventario/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};