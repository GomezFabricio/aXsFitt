import { pool } from '../db.js';

/* -------------------------------------------------------------------------- */
/*                          DAR DE ALTA A UNA PERSONA                         */
/* -------------------------------------------------------------------------- */
export const createPersona = async (req, res, returnResponse = false) => {
    const { persona_nombre, persona_apellido, persona_dni, persona_fecha_nacimiento, persona_domicilio, persona_telefono } = req.body;
    const persona_fecha_alta = new Date();

    const [result] = await pool.query(
        "INSERT INTO `personas` (`persona_nombre`, `persona_apellido`, `persona_dni`, `persona_fecha_nacimiento`, `persona_domicilio`, `persona_telefono`, `persona_fecha_alta`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [persona_nombre, persona_apellido, persona_dni, persona_fecha_nacimiento, persona_domicilio, persona_telefono, persona_fecha_alta]
    );

    const response = {
        id: result.insertId,
        persona_nombre,
        persona_apellido,
        persona_dni,
        persona_fecha_nacimiento,
        persona_domicilio,
        persona_telefono,
        persona_fecha_alta
    };

    if (returnResponse) {
        return response;
    } else {
        res.json(response);
    }
};

/* -------------------------------------------------------------------------- */
/*                           ACTUALIZAR UNA PERSONA                           */
/* -------------------------------------------------------------------------- */
export const updatePersona = async (req, res) => {
    const { id } = req.params; // Extraer el ID de la persona de los parámetros de la solicitud

    // Consulta SQL para actualizar la información de la persona
    const [result] = await pool.query(
        `UPDATE personas 
        SET ?
        WHERE persona_id = ?`,
        [
            req.body,
            id
        ]
    );

    // Enviar respuesta de éxito
    res.json({ message: 'Persona actualizada exitosamente' });
};
