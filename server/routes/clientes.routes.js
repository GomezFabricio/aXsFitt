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
router.put('/clientes/:id/deactivate', deactivateCliente);
router.put('/clientes/:id/activate', activateCliente);

export default router;
