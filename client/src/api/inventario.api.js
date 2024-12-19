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
        const response = await axios.get('https://localhost:4000/inventario/inventario-list', config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para listar todas las marcas
export const marcasList = async () => {
    try {
        const response = await axios.get('https://localhost:4000/inventario/marcas-list', config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para listar todos los tipos de productos
export const tiposProductosList = async () => {
    try {
        const response = await axios.get('https://localhost:4000/inventario/tipos-productos-list', config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para listar todos los productos
export const productosList = async () => {
    try {
        const response = await axios.get('https://localhost:4000/inventario/productos-list', config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar un tipo de producto
export const agregarTipoProducto = async (nombreTipoProducto) => {
    try {
        const response = await axios.post('https://localhost:4000/inventario/agregar-tipo-producto', { nombreTipoProducto }, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar una marca
export const agregarMarca = async (nombreMarcaProducto) => {
    try {
        const response = await axios.post('https://localhost:4000/inventario/agregar-marca', { nombreMarcaProducto }, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar un producto
export const agregarProducto = async (producto) => {
    try {
        const response = await axios.post('https://localhost:4000/inventario/agregar-producto', producto, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar inventario
export const agregarInventario = async (inventario) => {
    try {
        const response = await axios.post('https://localhost:4000/inventario/agregar-inventario', inventario, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para obtener inventario por ID
export const obtenerInventarioPorId = async (id) => {
    try {
        const response = await axios.get(`https://localhost:4000/inventario/obtener-inventario/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para eliminar inventario
export const eliminarInventario = async (id) => {
    try {
        const response = await axios.delete(`https://localhost:4000/inventario/eliminar-inventario/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para eliminar marca
export const eliminarMarca = async (id) => {
    try {
        const response = await axios.delete(`https://localhost:4000/inventario/eliminar-marca/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para eliminar tipo de producto
export const eliminarTipoProducto = async (id) => {
    try {
        const response = await axios.delete(`https://localhost:4000/inventario/eliminar-tipo-producto/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para eliminar producto
export const eliminarProducto = async (id) => {
    try {
        const response = await axios.delete(`https://localhost:4000/inventario/eliminar-producto/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para editar inventario
export const editarInventario = async (id, inventario) => {
    try {
        const response = await axios.put(`https://localhost:4000/inventario/editar-inventario/${id}`, inventario, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para editar producto
export const editarProducto = async (id, producto) => {
    try {
        const response = await axios.put(`https://localhost:4000/inventario/editar-producto/${id}`, producto, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para editar marca
export const editarMarca = async (id, marca) => {
    try {
        const response = await axios.put(`https://localhost:4000/inventario/editar-marca/${id}`, marca, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para editar tipo de producto
export const editarTipoProducto = async (id, tipoProducto) => {
    try {
        const response = await axios.put(`https://localhost:4000/inventario/editar-tipo-producto/${id}`, tipoProducto, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Funciones para ver inactivos
export const verInventariosInactivos = async () => {
    try {
        const response = await axios.get('https://localhost:4000/inventario/inventarios-inactivos', config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verProductosInactivos = async () => {
    try {
        const response = await axios.get('https://localhost:4000/inventario/productos-inactivos', config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verMarcasInactivas = async () => {
    try {
        const response = await axios.get('https://localhost:4000/inventario/marcas-inactivas', config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verTiposProductosInactivos = async () => {
    try {
        const response = await axios.get('https://localhost:4000/inventario/tipos-productos-inactivos', config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Funciones para reactivar
export const reactivarInventario = async (id) => {
    try {
        const response = await axios.put(`https://localhost:4000/inventario/reactivar-inventario/${id}`, {}, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const reactivarProducto = async (id) => {
    try {
        const response = await axios.put(`https://localhost:4000/inventario/reactivar-producto/${id}`, {}, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const reactivarMarca = async (id) => {
    try {
        const response = await axios.put(`https://localhost:4000/inventario/reactivar-marca/${id}`, {}, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const reactivarTipoProducto = async (id) => {
    try {
        const response = await axios.put(`https://localhost:4000/inventario/reactivar-tipo-producto/${id}`, {}, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};