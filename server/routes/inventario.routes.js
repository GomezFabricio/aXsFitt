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
    reduceStock
} from '../controllers/inventario.controller.js';

const router = Router();

// Rutas para tipos de productos
router.post('/tipos-productos', createTipoProducto);

// Rutas para marcas de productos
router.post('/marcas-productos', createMarcaProducto);

// Rutas para productos
router.post('/productos', createProducto);
router.put('/productos/:producto_id', editProducto);
router.delete('/productos/:producto_id', deleteProducto);
router.get('/productos', listProductos);

// Rutas para stock
router.post('/stock', registerStock);
router.put('/stock/add', addStock);
router.put('/stock/reduce', reduceStock);

export default router;

