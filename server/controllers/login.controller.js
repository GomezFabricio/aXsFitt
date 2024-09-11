import { pool } from '../db.js';
import { SECRET_KEY } from '../config.js';
import jwt from 'jsonwebtoken';

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

        // Obtener los roles asociados al usuario
        const [roles] = await pool.query(
            `SELECT r.rol_tipo_rol 
            FROM usuarios_roles ur 
            JOIN roles r ON ur.rol_id = r.rol_id 
            WHERE ur.usuario_id = ?`,
            [usuario[0].usuario_id]
        );

        if (roles.length === 0) {
            return res.status(403).json({ message: 'No tiene roles asignados' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { userId: usuario[0].usuario_id, roles: roles.map(role => role.rol_tipo_rol) },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Devolver el token y la información del usuario
        res.json({
            message: 'Login exitoso',
            usuario: {
                id: usuario[0].usuario_id,
                email: usuario[0].usuario_email,
                roles: roles.map(role => role.rol_tipo_rol),
            },
            token, // Enviar el token al cliente
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
