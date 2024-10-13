import { Router } from 'express';
import { inventarioList, marcasList, tiposProductosList, productosList } from '../controllers/inventario.controller.js';

const router = Router();

router.get('/inventario/inventario-list', inventarioList);
router.get('/inventario/marcas-list', marcasList);
router.get('/inventario/tipos-productos-list', tiposProductosList);
router.get('/inventario/productos-list', productosList);

export default router;