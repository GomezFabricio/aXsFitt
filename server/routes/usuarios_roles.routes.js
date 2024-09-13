import { Router } from 'express';
import { seleccionarRol, cambiarRol } from '../controllers/usuarios_roles.controller.js';

const router = Router();

// Ruta para seleccionar un rol al iniciar sesión
router.post('/seleccionar-rol', seleccionarRol);

// Ruta para cambiar de rol en cualquier momento
router.put('/cambiar-rol', cambiarRol);

export default router;