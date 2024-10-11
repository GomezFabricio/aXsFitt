import { Router } from 'express';
import {
    createTipoProducto,
    createMarcaProducto,
    createProducto,
    registerStock,
    editProducto,
    deleteProducto,
    listProductos,
    addStock,
    reduceStock,
    inventarioList
} from '../controllers/inventario.controller.js';

const router = Router();

router.post('/tipos-productos', createTipoProducto);
router.post('/marcas-productos', createMarcaProducto);
router.post('/productos', createProducto);
router.post('/inventario', registerStock);
router.put('/productos/:producto_id', editProducto);
router.delete('/productos/:producto_id', deleteProducto);
router.get('/productos', listProductos);
router.put('/inventario/add', addStock);
router.put('/inventario/reduce', reduceStock);
router.get('/inventario-list', inventarioList);

export default router;