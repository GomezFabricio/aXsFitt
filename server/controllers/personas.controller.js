import { pool } from '../db.js';

/* -------------------------------------------------------------------------- */
/*                          DAR DE ALTA A UNA PERSONA                         */
/* -------------------------------------------------------------------------- */
export const createPersona = async (personaData) => {
    const { persona_nombre, persona_apellido, persona_dni, persona_fecha_nacimiento, persona_domicilio, persona_telefono } = personaData;
    const persona_fecha_alta = new Date();

    try {
        const [result] = await pool.query(
            "INSERT INTO `personas` (`persona_nombre`, `persona_apellido`, `persona_dni`, `persona_fecha_nacimiento`, `persona_domicilio`, `persona_telefono`, `persona_fecha_alta`) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [persona_nombre, persona_apellido, persona_dni, persona_fecha_nacimiento, persona_domicilio, persona_telefono, persona_fecha_alta]
        );

        return {
            id: result.insertId,
            persona_nombre,
            persona_apellido,
            persona_dni,
            persona_fecha_nacimiento,
            persona_domicilio,
            persona_telefono,
            persona_fecha_alta
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

/* -------------------------------------------------------------------------- */
/*                           ACTUALIZAR UNA PERSONA                           */
/* -------------------------------------------------------------------------- */
export const updatePersona = async (personaId, personaData) => {
    try {
        const [result] = await pool.query(
            `UPDATE personas SET ? WHERE persona_id = ?`,
            [personaData, personaId]
        );
        return { success: true };
    } catch (error) {
        throw new Error(error.message);
    }
};
