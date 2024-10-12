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

// Eliminar un cliente (cambiar el estado a inactivo)
export const deleteClienteRequest = async (id) => {
  try {
    const response = await axios.put(`http://localhost:4000/clientes/${id}/baja`, null, config);
    return response.data;
  } catch (error) {
    console.error("Error al intentar inactivar al cliente:", error);
    throw error;
  }
};

// Activar un cliente inactivo
export const activateClienteRequest = async (id) => {
  try {
    const response = await axios.put(`http://localhost:4000/clientes/${id}/activar`, null, config);
    return response.data;
  } catch (error) {
    console.error("Error al intentar activar al cliente:", error);
    throw error;
  }
};
