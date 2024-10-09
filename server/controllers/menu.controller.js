import { pool } from '../db.js';

export const getMenuByRole = async (req, res) => {
    try {
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
        console.error('Error en getMenuByRole:', error);
        return res.status(500).json({ message: error.message });
    }
};