import { pool } from '../db.js';
import { createPersona } from './personas.controller.js';

/* -------------------------------------------------------------------------- */
/*                    OBTENER TODOS LOS VENDEDORES ACTIVOS                    */
/* -------------------------------------------------------------------------- */
export const getVendedores = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT 
                v.vendedor_id, 
                v.estado_vendedor_id, 
                v.vendedor_fecha_ingreso, 
                p.persona_nombre, 
                p.persona_apellido, 
                p.persona_dni, 
                p.persona_fecha_nacimiento, 
                p.persona_domicilio, 
                p.persona_telefono 
            FROM 
                vendedores v 
            INNER JOIN 
                personas p 
            ON 
                v.persona_id = p.persona_id`
        );

        // Enviar los datos obtenidos como respuesta
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                   OBTENER TODOS LOS VENDEDORES INACTIVOS                   */
/* -------------------------------------------------------------------------- */
export const getVendedoresInactivos = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT 
                v.vendedor_id, 
                v.estado_vendedor_id, 
                v.vendedor_fecha_ingreso, 
                p.persona_nombre, 
                p.persona_apellido, 
                p.persona_dni, 
                p.persona_fecha_nacimiento, 
                p.persona_domicilio, 
                p.persona_telefono 
            FROM 
                vendedores v 
            INNER JOIN 
                personas p 
            ON 
                v.persona_id = p.persona_id 
            WHERE 
                v.estado_vendedor_id = 2`  // Solo inactivos
        );

        // Enviar los datos obtenidos como respuesta
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                           OBTENER VENDEDOR POR ID                          */
/* -------------------------------------------------------------------------- */
export const getVendedor = async (req, res) => {
    const { id } = req.params;  // Extraer el ID del vendedor de los parámetros de la solicitud

    try {
        const [rows] = await pool.query(
            `SELECT 
                v.vendedor_id, 
                v.estado_vendedor_id, 
                v.vendedor_fecha_ingreso, 
                p.persona_nombre, 
                p.persona_apellido, 
                p.persona_dni, 
                p.persona_fecha_nacimiento, 
                p.persona_domicilio, 
                p.persona_telefono 
            FROM 
                vendedores v 
            INNER JOIN 
                personas p 
            ON 
                v.persona_id = p.persona_id
            WHERE 
                v.vendedor_id = ?`, [id]
        );

        // Si no se encuentra un vendedor con ese ID, enviar un mensaje de error
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Vendedor no encontrado' });
        }

        // Enviar los datos del vendedor como respuesta
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                          DAR DE ALTA A UN VENDEDOR                         */
/* -------------------------------------------------------------------------- */
export const createVendedor = async (req, res) => {
    try {
        // Primero creamos la persona
        const personaResponse = await createPersona(req, res, true);

        // Si la creación de la persona fue exitosa, seguimos con la creación del vendedor
        if (personaResponse && personaResponse.id) {
            const personaId = personaResponse.id;
            const vendedor_fecha_ingreso = new Date();
            const estado_vendedor_id = 1;  // Estado activo

            const [vendedorResult] = await pool.query(
                "INSERT INTO `vendedores` (`persona_id`, `estado_vendedor_id`, `vendedor_fecha_ingreso`) VALUES (?, ?, ?)",
                [personaId, estado_vendedor_id, vendedor_fecha_ingreso]
            );

            res.json({
                id: vendedorResult.insertId,
                persona_id: personaId,
                estado_vendedor_id,
                vendedor_fecha_ingreso
            });
        } else {
            res.status(500).json({ message: 'Error al registrar al vendedor.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                      ACTUALIZAR UN VENDEDOR (PERSONA)                      */
/* -------------------------------------------------------------------------- */
export const updateVendedor = async (req, res) => {
    const { id } = req.params; // Extraer el ID del vendedor de los parámetros de la solicitud

    try {
        // Consulta SQL para obtener el ID de la persona asociado al vendedor
        const [vendedor] = await pool.query(
            `SELECT persona_id FROM vendedores WHERE vendedor_id = ?`, [id]
        );

        // Verificar si el vendedor existe
        if (vendedor.length === 0) {
            return res.status(404).json({ message: 'Vendedor a actualizar no encontrado' });
        }

        const personaId = vendedor[0].persona_id; // Extraer el ID de la persona

        // Actualizar la información de la persona
        req.params.id = personaId; // Reemplazar el ID en los parámetros con el ID de la persona
        await updatePersona(req, res); // Llamar a la función para actualizar la persona

        // Enviar respuesta de éxito
        res.json({ message: 'Vendedor actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                 CAMBIAR EL ESTADO DE UN VENDEDOR A INACTIVO                */
/* -------------------------------------------------------------------------- */
export const deactivateVendedor = async (req, res) => {
    const { id } = req.params; // Extraer el ID del vendedor de los parámetros de la solicitud

    try {
        // Cambiar el estado del vendedor a inactivo (ID 2)
        await pool.query("UPDATE vendedores SET estado_vendedor_id = 2 WHERE vendedor_id = ?", [id]);

        res.json({ message: 'Vendedor dado de baja exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                  CAMBIAR EL ESTADO DE UN VENDEDOR A ACTIVO                 */
/* -------------------------------------------------------------------------- */
export const activateVendedor = async (req, res) => {
    const { id } = req.params; // Extraer el ID del vendedor de los parámetros de la solicitud

    try {
        // Cambiar el estado del vendedor a activo (ID 1)
        await pool.query("UPDATE vendedores SET estado_vendedor_id = 1 WHERE vendedor_id = ?", [id]);

        res.json({ message: 'Vendedor reactivado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
