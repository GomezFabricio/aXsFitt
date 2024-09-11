import { pool } from '../db.js';

/* -------------------------------------------------------------------------- */
/*                          LOGIN DEL USUARIO                                 */
/* -------------------------------------------------------------------------- */
export const login = async (email, password) => {
    try {
        // Verificar si el usuario existe con el email y contraseña proporcionados
        const [usuario] = await pool.query(
            "SELECT * FROM `usuarios` WHERE `usuario_email` = ? AND `usuario_pass` = ?",
            [email, password]
        );

        if (usuario.length === 0) {
            throw new Error('Credenciales inválidas');
        }

        // Obtener los roles asociados al usuario
        const [roles] = await pool.query(
            `SELECT r.rol_tipo_rol 
            FROM usuarios_roles ur 
            JOIN roles r ON ur.rol_id = r.rol_id 
            WHERE ur.usuario_id = ?`,
            [usuario[0].usuario_id]
        );

        if (roles.length === 0) {
            throw new Error('No tiene roles asignados');
        }

        // Devolver información del usuario junto con los roles
        return {
            message: 'Login exitoso',
            usuario: {
                id: usuario[0].usuario_id,
                email: usuario[0].usuario_email,
                roles: roles.map(role => role.rol_tipo_rol),
            },
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
