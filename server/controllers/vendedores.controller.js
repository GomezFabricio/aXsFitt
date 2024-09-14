// controllers/vendedores.controller.js
import { pool } from '../db.js';
import { createPersona, updatePersona } from './personas.controller.js';
import { createUser } from './usuarios.controller.js';
import { asignarRolUsuario } from './usuarios_roles.controller.js';
import authenticate from '../middlewares/auth.middleware.js';  // Importar middleware de autenticación

/* -------------------------------------------------------------------------- */
/*                    OBTENER TODOS LOS VENDEDORES                            */
/* -------------------------------------------------------------------------- */
export const getVendedores = [
    authenticate,  // Middleware de autenticación
    async (req, res) => {
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
                    v.estado_vendedor_id = 1`
            );

            res.json(rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

/* -------------------------------------------------------------------------- */
/*                   OBTENER TODOS LOS VENDEDORES INACTIVOS                   */
/* -------------------------------------------------------------------------- */
export const getVendedoresInactivos = [
    authenticate,  // Middleware de autenticación
    async (req, res) => {
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

            res.json(rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

/* -------------------------------------------------------------------------- */
/*                           OBTENER VENDEDOR POR ID                          */
/* -------------------------------------------------------------------------- */
export const getVendedor = [
    authenticate,  // Middleware de autenticación
    async (req, res) => {
        const { id } = req.params;

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

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Vendedor no encontrado' });
            }

            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

/* -------------------------------------------------------------------------- */
/*                          DAR DE ALTA A UN VENDEDOR                         */
/* -------------------------------------------------------------------------- */
export const createVendedor = [
    authenticate,  // Middleware de autenticación
    async (req, res) => {
        try {
            const { personaData, usuarioData } = req.body;

            const estado_vendedor_id = 1;
            const fecha_ingreso = new Date();

            const personaResponse = await createPersona(personaData);
            if (!personaResponse || !personaResponse.id) {
                return res.status(500).json({ message: 'Error al crear la persona.' });
            }

            const [vendedorResult] = await pool.query(
                "INSERT INTO `vendedores` (`persona_id`, `estado_vendedor_id`, `vendedor_fecha_ingreso`) VALUES (?, ?, ?)",
                [personaResponse.id, estado_vendedor_id, fecha_ingreso]
            );

            const usuarioResponse = await createUser({ ...usuarioData, persona_id: personaResponse.id });
            if (!usuarioResponse || !usuarioResponse.id) {
                return res.status(500).json({ message: 'Error al crear el usuario.' });
            }

            await asignarRolUsuario(usuarioResponse.id, 'Vendedor');

            res.json({
                id: vendedorResult.insertId,
                persona_id: personaResponse.id,
                estado_vendedor_id,
                fecha_ingreso
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

/* -------------------------------------------------------------------------- */
/*                      ACTUALIZAR UN VENDEDOR (PERSONA)                      */
/* -------------------------------------------------------------------------- */
export const updateVendedor = [
    authenticate,  // Middleware de autenticación
    async (req, res) => {
        const { id } = req.params;

        try {
            const [vendedor] = await pool.query(
                `SELECT persona_id FROM vendedores WHERE vendedor_id = ?`, [id]
            );

            if (vendedor.length === 0) {
                return res.status(404).json({ message: 'Vendedor a actualizar no encontrado' });
            }

            const personaId = vendedor[0].persona_id;
            req.params.id = personaId;
            await updatePersona(req, res);

            res.status(200).json({ message: 'Vendedor actualizado exitosamente' });
        } catch (error) {
            res.status(700).json({ message: 'Error al actualizar el vendedor', error: error.message });
        }
    }
];

/* -------------------------------------------------------------------------- */
/*                 CAMBIAR EL ESTADO DE UN VENDEDOR A INACTIVO                */
/* -------------------------------------------------------------------------- */
export const deactivateVendedor = [
    authenticate,  // Middleware de autenticación
    async (req, res) => {
        const { id } = req.params;

        try {
            await pool.query("UPDATE vendedores SET estado_vendedor_id = 2 WHERE vendedor_id = ?", [id]);

            res.json({ message: 'Vendedor dado de baja exitosamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

/* -------------------------------------------------------------------------- */
/*                  CAMBIAR EL ESTADO DE UN VENDEDOR A ACTIVO                 */
/* -------------------------------------------------------------------------- */
export const activateVendedor = [
    authenticate,  // Middleware de autenticación
    async (req, res) => {
        const { id } = req.params;

        try {
            await pool.query("UPDATE vendedores SET estado_vendedor_id = 1 WHERE vendedor_id = ?", [id]);

            res.json({ message: 'Vendedor reactivado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];
