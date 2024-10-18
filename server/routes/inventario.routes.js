import { Router } from 'express';
import { 
    inventarioList, 
    marcasList, 
    tiposProductosList, 
    productosList, 
    agregarTipoProducto, 
    agregarMarca, 
    agregarProducto,
    agregarInventario,
    obtenerInventarioPorId,
    eliminarInventario,
    eliminarMarca,
    eliminarTipoProducto,
    eliminarProducto
} from '../controllers/inventario.controller.js';

const router = Router();

router.get('/inventario/inventario-list', inventarioList);
router.get('/inventario/marcas-list', marcasList);
router.get('/inventario/tipos-productos-list', tiposProductosList);
router.get('/inventario/productos-list', productosList);

router.post('/inventario/agregar-tipo-producto', agregarTipoProducto); 
router.post('/inventario/agregar-marca', agregarMarca); 
router.post('/inventario/agregar-producto', agregarProducto); 
router.post('/inventario/agregar-inventario', agregarInventario);
router.get('/inventario/obtener-inventario/:id', obtenerInventarioPorId);

router.delete('/inventario/eliminar-inventario/:id', eliminarInventario); 
router.delete('/inventario/eliminar-marca/:id', eliminarMarca);
router.delete('/inventario/eliminar-tipo-producto/:id', eliminarTipoProducto);
router.delete('/inventario/eliminar-producto/:id', eliminarProducto);

export default router;