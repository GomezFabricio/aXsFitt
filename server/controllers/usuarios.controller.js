import { pool } from '../db.js';

export const createUser = async (usuarioData) => {
    try {
        const { persona_id, usuario_email, usuario_pass } = usuarioData; 

        const [result] = await pool.query(
            "INSERT INTO `usuarios` (`persona_id`, `usuario_email`, `usuario_pass`) VALUES (?, ?, ?)",
            [persona_id, usuario_email, usuario_pass]
        );

        return { id: result.insertId }; // Retorna el id del nuevo usuario
    } catch (error) {
        throw new Error('Error al crear el usuario: ' + error.message);
    }
};

// Crear una funcion para listar los usuarios siguiendo la estructura de los demas controladores 
