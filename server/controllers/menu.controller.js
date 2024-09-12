import { pool } from '../db.js';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

export const getMenuByRole = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Obtener el token del header
        const decoded = jwt.verify(token, SECRET_KEY); // Verificar el token
        const userId = decoded.id;

        // Obtener el rol del usuario logueado
        const [roles] = await pool.query(
            `SELECT r.rol_id 
             FROM usuarios_roles ur 
             JOIN roles r ON ur.rol_id = r.rol_id 
             WHERE ur.usuario_id = ?`,
            [userId]
        );

        if (roles.length === 0) {
            return res.status(404).json({ message: 'No se encontró rol para el usuario' });
        }

        const rolId = roles[0].rol_id;

        // Obtener las opciones del menú basadas en el rol
        const [menuOptions] = await pool.query(
            `SELECT opcion_nombre 
             FROM menu_opciones 
             WHERE rol_id = ?`,
            [rolId]
        );

        res.json({ menu: menuOptions.map(option => option.opcion_nombre) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
