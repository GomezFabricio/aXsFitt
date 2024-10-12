import { Router } from 'express';
import { 
    getClientes, 
    getCliente, 
    createCliente, 
    updateCliente, 
    deactivateCliente, 
    activateCliente
} from '../controllers/clientes.controller.js';

const router = Router();

router.get('/clientes', getClientes);
router.get('/clientes/:id', getCliente);
router.post('/clientes', createCliente);
router.put('/clientes/:id', updateCliente);
router.put('/clientes/:id/baja', deactivateCliente);  // Cambié deactivate por baja para que coincida con el frontend
router.put('/clientes/:id/activar', activateCliente);  // Cambié activate por activar
// router.delete('/clientes/:id', deleteCliente);      // Esta ruta parece innecesaria si solo inactivas clientes

export default router;
