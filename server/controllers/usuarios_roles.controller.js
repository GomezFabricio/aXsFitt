import { pool } from '../db.js';

const asignarRolUsuario = async (usuarioId, rolNombre) => {
    // Obtener el ID del rol utilizando el nombre del rol
    const [rolResult] = await pool.query(
        "SELECT id FROM roles WHERE nombre = ?",
        [rolNombre]
    );

    if (rolResult.length > 0) {
        const rolId = rolResult[0].id;

        // Insertar la asignación del rol al usuario
        await pool.query(
            "INSERT INTO usuario_roles (usuario_id, rol_id) VALUES (?, ?)",
            [usuarioId, rolId]
        );
    } else {
        throw new Error('Rol no encontrado.');
    }
};
