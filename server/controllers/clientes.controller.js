import { pool } from '../db.js';
import { createPersona, updatePersona } from './personas.controller.js';

/* -------------------------------------------------------------------------- */
/*                          OBTENER TODOS LOS CLIENTES                        */
/* -------------------------------------------------------------------------- */
export const getClientes = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT 
                c.cliente_id, 
                c.estado_afiliacion_id,  
                c.cliente_fecha_afiliacion AS cliente_fecha_alta,  
                p.persona_nombre, 
                p.persona_apellido, 
                p.persona_dni, 
                p.persona_fecha_nacimiento, 
                p.persona_domicilio,    
                p.persona_telefono,
                u.usuario_email  /* Agregar el correo desde la tabla usuarios */
            FROM 
                clientes c 
            INNER JOIN 
                personas p 
            ON 
                c.persona_id = p.persona_id
            LEFT JOIN usuarios u ON p.persona_id = u.persona_id` // Unir con la tabla usuarios
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                           OBTENER CLIENTE POR ID                           */
/* -------------------------------------------------------------------------- */
export const getCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            `SELECT 
                c.cliente_id, 
                c.estado_afiliacion_id,  
                c.cliente_fecha_afiliacion AS cliente_fecha_alta,  
                p.persona_nombre, 
                p.persona_apellido, 
                p.persona_dni, 
                p.persona_fecha_nacimiento, 
                p.persona_telefono,
                u.usuario_email  
            FROM 
                clientes c 
            INNER JOIN 
                personas p 
            ON 
                c.persona_id = p.persona_id
            LEFT JOIN usuarios u ON p.persona_id = u.persona_id
            WHERE 
                c.cliente_id = ?`, 
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                          CREAR UN NUEVO CLIENTE                            */
/* -------------------------------------------------------------------------- */
export const createCliente = async (req, res) => {
    try {
        const { persona_nombre, persona_apellido, persona_dni, persona_fecha_nacimiento, persona_domicilio, persona_telefono, persona_email, usuario_pass } = req.body;
        const estado_afiliacion_id = 1; // Estado activo por defecto
        const cliente_fecha_afiliacion = new Date();  // Fecha de alta

        // Verificar si tanto el correo como la contraseña están presentes
        if (!persona_email || !usuario_pass) {
            return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });
        }

        // Crear la persona
        const personaData = { 
            persona_nombre, 
            persona_apellido, 
            persona_dni, 
            persona_fecha_nacimiento, 
            persona_domicilio, 
            persona_telefono 
        };
        
        const personaResponse = await createPersona(personaData);  // Función que guarda la persona en la DB
        if (!personaResponse || !personaResponse.id) {
            return res.status(500).json({ message: 'Error al crear la persona.' });
        }

        // Crear el cliente con la persona creada
        const [clienteResult] = await pool.query(
            "INSERT INTO `clientes` (`persona_id`, `estado_afiliacion_id`, `cliente_fecha_afiliacion`) VALUES (?, ?, ?)",
            [personaResponse.id, estado_afiliacion_id, cliente_fecha_afiliacion]
        );

        // Insertar el correo y la contraseña en la tabla de usuarios
        await pool.query(
            "INSERT INTO `usuarios` (`persona_id`, `usuario_email`, `usuario_pass`) VALUES (?, ?, ?)",
            [personaResponse.id, persona_email, usuario_pass]
        );

        res.json({
            id: clienteResult.insertId,
            persona_id: personaResponse.id,
            estado_afiliacion_id,
            cliente_fecha_afiliacion
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                      ACTUALIZAR UN CLIENTE (PERSONA)                       */
/* -------------------------------------------------------------------------- */
export const updateCliente = async (req, res) => {
    const { id } = req.params;

    const { persona_nombre, persona_apellido, persona_dni, persona_fecha_nacimiento, persona_telefono, persona_email, usuario_pass, estado_afiliacion_id } = req.body;

    if (!persona_nombre || !persona_dni) {
        return res.status(400).json({ message: 'Datos incompletos para la persona.' });
    }

    try {
        const [cliente] = await pool.query(
            `SELECT persona_id FROM clientes WHERE cliente_id = ?`, [id]
        );

        if (cliente.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        const personaId = cliente[0].persona_id;

        // Actualizar la información de la persona
        const personaData = {
            persona_nombre,
            persona_apellido,
            persona_dni,
            persona_fecha_nacimiento: persona_fecha_nacimiento ? new Date(persona_fecha_nacimiento) : null,
            persona_telefono
        };
        

        await updatePersona(personaId, personaData);

        // Actualizar el correo en la tabla de usuarios
        if (persona_email) {
            await pool.query(
                `UPDATE usuarios SET usuario_email = ? WHERE persona_id = ?`,
                [persona_email, personaId]
            );
        }

        // Actualizar la contraseña en la tabla de usuarios si se pasa una
        if (usuario_pass) {
            await pool.query(
                `UPDATE usuarios SET usuario_pass = ? WHERE persona_id = ?`,
                [usuario_pass, personaId]
            );
        }

        // Actualizar el estado de afiliación
        if (estado_afiliacion_id !== undefined) {
            await pool.query(`UPDATE clientes SET estado_afiliacion_id = ? WHERE cliente_id = ?`, [
                estado_afiliacion_id,
                id
            ]);
        }

        return res.json({ message: 'Cliente actualizado exitosamente' });

    } catch (error) {
        console.error('Error actualizando el cliente:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

/* -------------------------------------------------------------------------- */
/*                CAMBIAR EL ESTADO DE UN CLIENTE A INACTIVO                  */
/* -------------------------------------------------------------------------- */
export const deactivateCliente = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("UPDATE clientes SET estado_afiliacion_id = 2 WHERE cliente_id = ?", [id]);

        res.json({ message: 'Cliente inactivado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                  CAMBIAR EL ESTADO DE UN CLIENTE A ACTIVO                  */
/* -------------------------------------------------------------------------- */
export const activateCliente = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("UPDATE clientes SET estado_afiliacion_id = 1 WHERE cliente_id = ?", [id]);

        res.json({ message: 'Cliente reactivado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                           ELIMINAR UN CLIENTE (LÓGICA)                     */
/* -------------------------------------------------------------------------- */
export const deleteCliente = async (req, res) => {
    const { id } = req.params;

    try {
        // Cambiar el estado de afiliación del cliente a inactivo (estado 2)
        const [result] = await pool.query(
            "UPDATE clientes SET estado_afiliacion_id = 2 WHERE cliente_id = ?", 
            [id]
        );

        // Verificar si el cliente fue encontrado y actualizado
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json({ message: 'Cliente inactivado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
