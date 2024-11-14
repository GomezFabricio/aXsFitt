import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import { updatePersona } from './personas.controller.js';
import { createVendedor } from './vendedores.controller.js';

export const createUser = async (req, res) => {
    try {
        const { persona, usuario, roles } = req.body || req;
        console.log('Datos recibidos en el servidor:', { persona, usuario, roles });

        let personaId = persona.persona_id;

        // Verificar si el usuario tiene rol y si es administrador o vendedor
        if (roles && (roles.includes(1) || roles.includes(2))) {
            // Crear un registro en la tabla vendedores y obtener el persona_id
            const vendedorResponse = await createVendedor({ body: { personaData: persona, usuarioData: usuario } });
            if (!vendedorResponse || !vendedorResponse.persona_id) {
                throw new Error('Error al crear el vendedor');
            }
            personaId = vendedorResponse.persona_id;
        } else {
            // Si no tiene persona_id, crear la persona directamente
            if (!personaId) {
                const personaResponse = await createPersona(persona);
                if (!personaResponse || !personaResponse.id) {
                    throw new Error('Error al crear la persona');
                }
                personaId = personaResponse.id;
            }
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

        // Asocia los roles al usuario si existen
        if (roles && roles.length > 0) {
            for (const rolId of roles) {
                await pool.query(
                    "INSERT INTO `usuarios_roles` (`usuario_id`, `rol_id`) VALUES (?, ?)",
                    [usuarioId, rolId]
                );
            }
        }

        if (res) {
            res.json({ id: usuarioId });
        } else {
            return { id: usuarioId };
        }
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        if (res) {
            res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
        } else {
            throw error;
        }
    }
};

// Función para obtener todos los usuarios, excluyendo al usuario logueado
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
};

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
};

// Función para obtener un usuario por su id, incluyendo los datos de la persona asociada y sus roles
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            `SELECT u.usuario_id, u.persona_id, p.persona_nombre, p.persona_apellido, p.persona_fecha_nacimiento, p.persona_telefono, p.persona_domicilio, p.persona_dni, u.usuario_email, u.estado_usuario_id, r.rol_tipo_rol
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

        // Agrupar los roles en un solo objeto de usuario
        const user = rows.reduce((acc, row) => {
            if (!acc.usuario_id) {
                acc = {
                    usuario_id: row.usuario_id,
                    persona_id: row.persona_id,
                    persona_nombre: row.persona_nombre,
                    persona_apellido: row.persona_apellido,
                    persona_fecha_nacimiento: row.persona_fecha_nacimiento,
                    persona_telefono: row.persona_telefono,
                    persona_domicilio: row.persona_domicilio,
                    persona_dni: row.persona_dni,
                    usuario_email: row.usuario_email,
                    estado_usuario_id: row.estado_usuario_id,
                    roles: []
                };
            }
            acc.roles.push(row.rol_tipo_rol);
            return acc;
        }, {});

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para actualizar un usuario
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
            estado_usuario_id || 1, // Asegúrate de enviar un estado válido
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
};

// Función para cambiar el estado de un usuario a inactivo
export const deactivateUser = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("UPDATE usuarios SET estado_usuario_id = 2 WHERE usuario_id = ?", [id]);

        res.json({ message: 'Usuario dado de baja exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para cambiar el estado de un usuario a activo
export const activateUser = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("UPDATE usuarios SET estado_usuario_id = 1 WHERE usuario_id = ?", [id]);

        res.json({ message: 'Usuario dado de alta exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};