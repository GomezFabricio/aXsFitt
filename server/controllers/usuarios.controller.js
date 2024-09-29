import { pool } from '../db.js';
import { createPersona, updatePersona } from './personas.controller.js';


export const createUser = async (usuarioData) => {
    try {
        const { persona_id, persona_nombre, persona_apellido, usuario_email, usuario_pass } = usuarioData;

        let personaId = persona_id;

        // Si no se proporciona persona_id, crea una nueva persona
        if (!personaId) {
            const personaResponse = await createPersona({ persona_nombre, persona_apellido });
            if (!personaResponse || !personaResponse.id) {
                throw new Error('Error al crear la persona.');
            }
            personaId = personaResponse.id;
        }

        // Inserta los datos del usuario usando el persona_id
        const [usuarioResult] = await pool.query(
            "INSERT INTO `usuarios` (`persona_id`, `usuario_email`, `usuario_pass`) VALUES (?, ?, ?)",
            [personaId, usuario_email, usuario_pass]
        );

        return { id: usuarioResult.insertId, persona_id: personaId }; // Retorna el id del nuevo usuario y el persona_id
    } catch (error) {
        throw new Error('Error al crear el usuario: ' + error.message);
    }
};

// Funcion para obtener todos los usuarios, incluso los datos de la persona asociada, sus roles y con el estado activo

export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT u.usuario_id, u.persona_id, p.persona_nombre, p.persona_apellido, u.usuario_email, u.estado_usuario_id, r.rol_tipo_rol
            FROM usuarios u
            JOIN personas p ON u.persona_id = p.persona_id
            JOIN usuarios_roles ur ON u.usuario_id = ur.usuario_id
            JOIN roles r ON ur.rol_id = r.rol_id
            WHERE u.estado_usuario_id = 1`
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Funcion para obtener todos los usuarios inactivos incluso con los datos de la persona asociada y sus roles

export const getInactiveUsers = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT u.usuario_id, u.persona_id, p.persona_nombre, p.persona_apellido, u.usuario_email, u.estado_usuario_id, r.rol_tipo_rol
            FROM usuarios u
            JOIN personas p ON u.persona_id = p.persona_id
            JOIN usuarios_roles ur ON u.usuario_id = ur.usuario_id
            JOIN roles r ON ur.rol_id = r.rol_id
            WHERE u.estado_usuario_id = 2`
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Funcion para obtener un usuario por su id, incluyendo los datos de la persona asociada y sus roles

export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            `SELECT u.usuario_id, u.persona_id, p.persona_nombre, p.persona_apellido, u.usuario_email, u.estado_usuario_id, r.rol_tipo_rol
            FROM usuarios u
            JOIN personas p ON u.persona_id = p.persona_id
            JOIN usuarios_roles ur ON u.usuario_id = ur.usuario_id
            JOIN roles r ON ur.rol_id = r.rol_id
            WHERE u.usuario_id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Funcion para actualizar un usuario 

export const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const persona_id = req.body.persona_id;

        const personaResult = await updatePersona(req);
        if (!personaResult || !personaResult.affectedRows) {
            return res.status(500).json({ message: 'Error al actualizar la persona.' });
        }

        const [result] = await pool.query(
            `UPDATE usuarios 
            SET ?
            WHERE usuario_id = ?`,
            [
                req.body,
                id
            ]
        );

        return res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
    
// Funcion para cambiar el estado de un usuario a inactivo 

export const deactivateUser = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("UPDATE usuarios SET estado_usuario_id = 2 WHERE usuario_id = ?", [id]);

        res.json({ message: 'Usuario dado de baja exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Funcion para cambiar el estado de un usuario a activo 

export const activateUser = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("UPDATE usuarios SET estado_usuario_id = 1 WHERE usuario_id = ?", [id]);

        res.json({ message: 'Usuario dado de alta exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

