import axios from 'axios';

// Obtener el token desde el almacenamiento local
const token = localStorage.getItem('token');

// Configuración del encabezado con el token
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

// Funciones para tipos de productos
export const createTipoProducto = async (tipoProducto) => {
    try {
        const response = await axios.post('/inventario/tipos-productos', tipoProducto, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Funciones para marcas de productos
export const createMarcaProducto = async (marcaProducto) => {
    try {
        const response = await axios.post('/inventario/marcas-productos', marcaProducto, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Funciones para productos
export const createProducto = async (producto) => {
    try {
        const response = await axios.post('/inventario/productos', producto, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const editProducto = async (productoId, producto) => {
    try {
        const response = await axios.put(`/inventario/productos/${productoId}`, producto, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteProducto = async (productoId) => {
    try {
        const response = await axios.delete(`/inventario/productos/${productoId}`, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const listProductos = async () => {
    try {
        const response = await axios.get('/inventario/productos', config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Funciones para stock
export const registerStock = async (stock) => {
    try {
        const response = await axios.post('/inventario/stock', stock, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const addStock = async (stock) => {
    try {
        const response = await axios.put('/inventario/stock/add', stock, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const reduceStock = async (stock) => {
    try {
        const response = await axios.put('/inventario/stock/reduce', stock, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};