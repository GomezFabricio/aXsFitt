import { pool } from '../db.js';

export const asignarRolUsuario = async (usuarioId, rolNombre) => {
    // Obtener el ID del rol utilizando el nombre del rol
    const [rolResult] = await pool.query(
        "SELECT rol_id FROM roles WHERE rol_tipo_rol = ?",
        [rolNombre]
    );

    if (rolResult.length > 0) {
        const rolId = rolResult[0].rol_id;

        // Insertar la asignación del rol al usuario
        await pool.query(
            "INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES (?, ?)",
            [usuarioId, rolId]
        );
    } else {
        throw new Error('Rol no encontrado.');
    }
};
