import { Router } from 'express';
import { inventarioList } from '../controllers/inventario.controller.js';

const router = Router();

router.get('/inventario/inventario-list', inventarioList);

export default router;