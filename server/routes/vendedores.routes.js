import { Router } from 'express'
import { getVendedores, getVendedor, createVendedor, updateVendedor, deactivateVendedor, activateVendedor, getVendedoresInactivos } from '../controllers/vendedores.controller.js'

const router = Router()

/* Solicitar todos los vendedores */
router.get('/vendedores', getVendedores)

/* Obtener un vendedor por su ID */
router.get('/vendedores/:id', getVendedor)

/* Crear un vendedor */
router.post('/vendedores', createVendedor)

/* Modificar un vendedor (actualizar información) */
router.put('/vendedores/:id', updateVendedor)

/* Dar de baja un vendedor (cambiar a inactivo) */
router.put('/vendedores/:id/baja', deactivateVendedor)

/* Reactivar un vendedor (cambiar a activo) */
router.put('/vendedores/:id/activar', activateVendedor)

/* Obtener vendedores inactivos */
router.get('/vendedores/inactivos', getVendedoresInactivos)

export default router
