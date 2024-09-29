import { pool } from '../db.js';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

/* -------------------------------------------------------------------------- */
/*                 SELECCIONAR ROL AL INICIAR SESIÓN                          */
/* -------------------------------------------------------------------------- */
export const seleccionarRol = async (req, res) => {
    const { rolId } = req.body; // El rol seleccionado por el usuario
    const token = req.headers.authorization.split(" ")[1]; // Obtener el token del header

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verificar el token
        const userId = decoded.userId; // Obtener el ID del usuario

        // Generar un nuevo token con el rol seleccionado
        const nuevoToken = jwt.sign(
            { userId, rolId }, // Guardamos el rolId en el token
            SECRET_KEY,
            { expiresIn: '1h' } // Expiración de 1 hora
        );

        // Obtener las opciones del menú basadas en el rol seleccionado
        const [menuOptions] = await pool.query(
            `SELECT opcion_nombre 
            FROM menu_opciones 
            WHERE rol_id = ?`,
            [rolId]
        );

        // Devolver el nuevo token y el menú correspondiente
        res.json({
            message: 'Rol seleccionado correctamente',
            token: nuevoToken, // Nuevo token con el rol
            menu: menuOptions.map(option => option.opcion_nombre),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*                 CAMBIAR DE ROL DURANTE LA SESIÓN                           */
/* -------------------------------------------------------------------------- */
export const cambiarRol = async (req, res) => {
    const { nuevoRolId } = req.body; // El nuevo rol que desea seleccionar el usuario
    const token = req.headers.authorization.split(" ")[1]; // Obtener el token del header

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verificar el token
        const userId = decoded.userId; // Obtener el ID del usuario

        // Generar un nuevo token con el nuevo rol
        const nuevoToken = jwt.sign(
            { userId, rolId: nuevoRolId }, // Guardamos el nuevo rolId en el token
            SECRET_KEY,
            { expiresIn: '1h' } // Expiración de 1 hora
        );

        // Obtener las opciones del menú basadas en el nuevo rol
        const [menuOptions] = await pool.query(
            `SELECT opcion_nombre 
            FROM menu_opciones 
            WHERE rol_id = ?`,
            [nuevoRolId]
        );

        // Devolver el nuevo token y el menú correspondiente
        res.json({
            message: 'Rol cambiado correctamente',
            token: nuevoToken, // Nuevo token con el nuevo rol
            menu: menuOptions.map(option => option.opcion_nombre),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* -------------------------------------------------------------------------- */
/*          ASIGNAR UN ROL AUTOMATICAMENTE AL DAR DE ALTA UN USUARIO          */
/* -------------------------------------------------------------------------- */
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


//funcion que permite obtener todos los roles de la base de datos

export const getAllRoles = async (req, res) => {
    try {
        const [roles] = await pool.query('SELECT * FROM roles');
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
