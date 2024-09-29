import { Router } from 'express';
import { seleccionarRol, cambiarRol } from '../controllers/usuarios_roles.controller.js';
import { getAllRoles } from '../controllers/usuarios_roles.controller.js';

const router = Router();

// Ruta para seleccionar un rol al iniciar sesión
router.post('/seleccionar-rol', seleccionarRol);

// Ruta para cambiar de rol en cualquier momento
router.put('/cambiar-rol', cambiarRol);

//agrega una nueva ruta para obtener los roles de un usuario desde el controlador de usuarios_roles.controller.js
router.get('/roles', getAllRoles);

export default router;