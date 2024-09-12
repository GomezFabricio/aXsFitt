import { Router } from 'express';
import { getMenuByRole } from '../controllers/menu.controller.js';

const router = Router();

router.get('/menu', getMenuByRole); // Ruta para obtener el menú basado en el rol del usuario

export default router;