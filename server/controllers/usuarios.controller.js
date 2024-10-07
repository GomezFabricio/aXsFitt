// controllers/usuarios.controller.js
import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import { createPersona } from './personas.controller.js';

export const createUser = async (req, res) => {
    try {
        const { persona, usuario, roles } = req.body || req;
        console.log('Datos recibidos en el servidor:', { persona, usuario, roles });

        let personaId = persona.persona_id;

        // Si no se proporciona persona_id, crea una nueva persona
        if (!personaId) {
            const personaResponse = await createPersona(persona);
            if (!personaResponse || !personaResponse.id) {
                throw new Error('Error al crear la persona.');
            }
            personaId = personaResponse.id;
        }

        // Cifrar la contraseña del usuario
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(usuario.usuario_pass, saltRounds);

        // Inserta los datos del usuario usando el persona_id
        const [usuarioResult] = await pool.query(
            "INSERT INTO `usuarios` (`persona_id`, `usuario_email`, `usuario_pass`, `estado_usuario_id`) VALUES (?, ?, ?, ?)",
            [personaId, usuario.usuario_email, hashedPassword, usuario.estado_usuario_id || 1]
        );

        const usuarioId = usuarioResult.insertId;

        // Asocia los roles al usuario
        for (const rolId of roles) {
            await pool.query(
                "INSERT INTO `usuarios_roles` (`usuario_id`, `rol_id`) VALUES (?, ?)",
                [usuarioId, rolId]
            );

            // Si el rol es "vendedor", también inserta en la tabla "vendedores"
            if (rolId === 2) { // Asumiendo que el rol de "vendedor" tiene el ID 2
                const estadoVendedorId = 1; // Estado inicial del vendedor
                const vendedorFechaIngreso = new Date().toISOString().split('T')[0]; // Fecha de hoy en formato YYYY-MM-DD

                await pool.query(
                    "INSERT INTO `vendedores` (`persona_id`, `estado_vendedor_id`, `vendedor_fecha_ingreso`) VALUES (?, ?, ?)",
                    [personaId, estadoVendedorId, vendedorFechaIngreso]
                );
            }
        }

        if (res) {
            res.status(201).json({ id: usuarioId, persona_id: personaId });
        } else {
            return { id: usuarioId, persona_id: personaId };
        }
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        if (res) {
            res.status(500).json({ message: 'Error al crear el usuario: ' + error.message });
        } else {
            throw error;
        }
    }
};

// Funcion para obtener todos los usuarios, incluso los datos de la persona asociada, sus roles y con el estado activo
export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT u.usuario_id, u.persona_id, p.persona_nombre, p.persona_apellido, p.persona_dni, u.usuario_email, u.estado_usuario_id, r.rol_tipo_rol
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

export const getInactiveUsers = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT u.usuario_id, u.persona_id, p.persona_nombre, p.persona_apellido, p.persona_dni, u.usuario_email, u.estado_usuario_id, r.rol_tipo_rol
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
    const { persona, usuario, roles } = req.body;

    try {
        // Consulta SQL para obtener el ID de la persona asociado al usuario
        const [user] = await pool.query(
            `SELECT persona_id FROM usuarios WHERE usuario_id = ?`, [id]
        );

        // Verificar si el usuario existe
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario a actualizar no encontrado' });
        }

        const personaId = user[0].persona_id;

        // Actualizar la información de la persona
        req.params.id = personaId;
        req.body = persona;
        await updatePersona(req);

        // Actualizar la información del usuario
        const { usuario_email, estado_usuario_id } = usuario;

        const updateUserQuery = `
            UPDATE usuarios 
            SET 
                usuario_email = ?, 
                estado_usuario_id = ?
            WHERE usuario_id = ?
        `;

        const updateUserParams = [
            usuario_email,
            estado_usuario_id,
            id
        ];

        await pool.query(updateUserQuery, updateUserParams);

        // Actualizar los roles del usuario
        await pool.query("DELETE FROM usuarios_roles WHERE usuario_id = ?", [id]);
        for (const rolId of roles) {
            await pool.query(
                "INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES (?, ?)",
                [id, rolId]
            );
        }

        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
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

