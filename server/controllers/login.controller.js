import { pool } from '../db.js';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

/* -------------------------------------------------------------------------- */
/*                          LOGIN DEL USUARIO                                 */
/* -------------------------------------------------------------------------- */
export const login = async (req, res) => {
    const { email, password } = req.body; // Obtener email y contraseña del cuerpo de la solicitud

    try {
        // Verificar si el usuario existe con el email y contraseña proporcionados
        const [usuario] = await pool.query(
            "SELECT * FROM `usuarios` WHERE `usuario_email` = ? AND `usuario_pass` = ?",
            [email, password]
        );

        if (usuario.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const userId = usuario[0].usuario_id;

        // Obtener los roles asociados al usuario
        const [roles] = await pool.query(
            `SELECT r.rol_tipo_rol, r.rol_id
            FROM usuarios_roles ur
            JOIN roles r ON ur.rol_id = r.rol_id
            WHERE ur.usuario_id = ?`,
            [userId]
        );

        if (roles.length === 0) {
            return res.status(403).json({ message: 'No tiene roles asignados' });
        }

        // Generar un token JWT
        const token = jwt.sign({ userId, roles: roles.map(role => role.rol_id) }, SECRET_KEY, { expiresIn: '1h' });

        // Devolver el token y los roles para que el usuario seleccione uno
        res.json({
            message: 'Login exitoso',
            token, // Incluye el token en la respuesta
            roles: roles.map(role => ({
                rolId: role.rol_id,
                rolNombre: role.rol_tipo_rol
            }))
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
