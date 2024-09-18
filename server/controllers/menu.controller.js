import { pool } from '../db.js';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

export const getMenuByRole = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Obtener el token del header
        const decoded = jwt.verify(token, SECRET_KEY); // Verificar el token
        const userId = decoded.userId;

        // Obtener el rol del usuario logueado
        const rolId = req.body.rolId || req.params.rolId; // Obtener rolId desde el cuerpo o parámetros


        // Comprobar si el rolId fue proporcionado
        if (!rolId) {
            return res.status(400).json({ message: 'El rol ID es requerido.' });
        }

        // Obtener las opciones del menú basadas en el rol
        const [menuOptions] = await pool.query(
            `SELECT opcion_nombre 
            FROM menu_opciones 
            WHERE rol_id = ?`,
            [rolId]
        );

        res.json({ menu: menuOptions.map(option => option.opcion_nombre) });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'El token ha expirado. Por favor, inicie sesión nuevamente.' });
        }
        console.error('Error en getMenuByRole:', error);
        return res.status(500).json({ message: error.message });
    }
};
