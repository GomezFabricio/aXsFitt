import { pool } from '../db.js';
import authenticate from '../middlewares/auth.middleware.js';  // Importar middleware de autenticación

export const createUser = [
    authenticate,
    async (usuarioData) => {
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
}];