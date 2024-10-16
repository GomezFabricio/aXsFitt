import { Router } from 'express';
import { 
    inventarioList, 
    marcasList, 
    tiposProductosList, 
    productosList, 
    agregarTipoProducto, 
    agregarMarca, 
    agregarProducto 
} from '../controllers/inventario.controller.js';

const router = Router();

router.get('/inventario/inventario-list', inventarioList);
router.get('/inventario/marcas-list', marcasList);
router.get('/inventario/tipos-productos-list', tiposProductosList);
router.get('/inventario/productos-list', productosList);

router.post('/inventario/agregar-tipo-producto', agregarTipoProducto); 
router.post('/inventario/agregar-marca', agregarMarca); 
router.post('/inventario/agregar-producto', agregarProducto); 

export default router;