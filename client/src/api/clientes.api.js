import axios from 'axios';

// Obtener el token desde el almacenamiento local
const token = localStorage.getItem('token');

// Configuración del encabezado con el token
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// Obtener la lista de clientes
export const getClientesRequest = async () => {
  return await axios.get('http://localhost:4000/clientes', config);
};

// Obtener un cliente por su ID
export const getClienteRequest = async (id) => {
  return await axios.get(`http://localhost:4000/clientes/${id}`, config);
};

// Crear un nuevo cliente con todos los datos de la persona y afiliación
export const createClienteRequest = async (data) => {
  try {
    const response = await axios.post('http://localhost:4000/clientes', data, config);
    return response.data;  // Retornar respuesta del servidor si es necesario
  } catch (error) {
    console.error("Error en la solicitud de creación del cliente:", error);
    throw error;
  }
};

// Actualizar un cliente existente
export const updateClienteRequest = async (id, updatedCliente) => {
  try {
    // Enviar solo los datos necesarios al backend
    const response = await axios.put(`http://localhost:4000/clientes/${id}`, updatedCliente, config);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud de actualización del cliente:", error);
    throw error;
  }
};

// Eliminar un cliente
export const deleteClienteRequest = async (id) => {
  return await axios.delete(`http://localhost:4000/clientes/${id}`, config);
};

// Desactivar un cliente (opcional si tienes esta funcionalidad)
export const deactivateCliente = async (id) => {
  return await axios.put(`http://localhost:4000/clientes/${id}/baja`, null, config);
};

// Obtener clientes inactivos (opcional si tienes esta funcionalidad)
export const getClientesInactivosRequest = async () => {
  return await axios.get('http://localhost:4000/clientes/inactivos', config);
};

// Activar un cliente inactivo (opcional si tienes esta funcionalidad)
export const activateClienteRequest = async (id) => {
  return await axios.put(`http://localhost:4000/clientes/${id}/activar`, null, config);
};
