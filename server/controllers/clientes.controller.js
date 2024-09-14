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
                c.estado_afiliacion_id,  /* Cambiado estado_cliente_id por estado_afiliacion_id */
                c.cliente_fecha_afiliacion AS cliente_fecha_alta,  /* Cambiado para coincidir con la base de datos */
                p.persona_nombre, 
                p.persona_apellido, 
                p.persona_dni, 
                p.persona_fecha_nacimiento, 
                p.persona_domicilio, 
                p.persona_telefono 
            FROM 
                clientes c 
            INNER JOIN 
                personas p 
            ON 
                c.persona_id = p.persona_id`
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
                c.estado_afiliacion_id,  /* Cambiado estado_cliente_id por estado_afiliacion_id */
                c.cliente_fecha_afiliacion AS cliente_fecha_alta,  /* Cambiado para coincidir con la base de datos */
                p.persona_nombre, 
                p.persona_apellido, 
                p.persona_dni, 
                p.persona_fecha_nacimiento, 
                p.persona_domicilio, 
                p.persona_telefono 
            FROM 
                clientes c 
            INNER JOIN 
                personas p 
            ON 
                c.persona_id = p.persona_id
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
        const { personaData } = req.body;
        const estado_afiliacion_id = 1; // Estado activo por defecto
        const cliente_fecha_afiliacion = new Date();  // Fecha de alta

        // Crear la persona
        const personaResponse = await createPersona(personaData);
        if (!personaResponse || !personaResponse.id) {
            return res.status(500).json({ message: 'Error al crear la persona.' });
        }

        // Crear el cliente con la persona creada
        const [clienteResult] = await pool.query(
            "INSERT INTO `clientes` (`persona_id`, `estado_afiliacion_id`, `cliente_fecha_afiliacion`) VALUES (?, ?, ?)",
            [personaResponse.id, estado_afiliacion_id, cliente_fecha_afiliacion]
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

    try {
        // Obtener el ID de la persona asociado al cliente
        const [cliente] = await pool.query(
            `SELECT persona_id FROM clientes WHERE cliente_id = ?`, [id]
        );

        if (cliente.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        const personaId = cliente[0].persona_id;

        // Actualizar la información de la persona
        req.params.id = personaId;
        await updatePersona(req, res);

        // Actualizar otros datos del cliente
        await pool.query(`UPDATE clientes SET estado_afiliacion_id = ? WHERE cliente_id = ?`, [
            req.body.estado_afiliacion_id, 
            id
        ]);

        res.json({ message: 'Cliente actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
