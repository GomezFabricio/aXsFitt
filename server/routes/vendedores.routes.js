import { Router } from 'express'
import { getVendedores, getVendedor, createVendedor, updateVendedor, deleteVendedor } from '../controllers/vendedores.controller.js'

const router = Router()

/* Solicitar todos los vendedores */
router.get('/vendedores', getVendedores) 

/* Obtener un vendedor por su ID */
router.get('/vendedores', getVendedor) 

/* Crear un vendedor */
router.post('/vendedores', createVendedor)

/* Modificar un vendedor */
router.put('/vendedores/:id', updateVendedor)

/* Eliminar un vendedor */
router.delete('/vendedores/:id', deleteVendedor)


export default router
