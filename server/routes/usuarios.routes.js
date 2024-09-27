import { Router } from "express";
import { createUser, getAllUsers, getInactiveUsers, getUserById, deactivateUser, updateUser, activateUser } from "../controllers/usuarios.controller.js";

const router = Router();

// Definir las rutas basandote en vendedores.routes.js

// Obtener todos los usuarios
router.get("/usuarios", getAllUsers);

// Obtener todos los usuarios inactivos
router.get("/usuarios/inactivos", getInactiveUsers);

// Obtener un usuario por su ID
router.get("/usuarios/:id", getUserById);

// Crear un usuario
router.post("/usuarios", createUser);

// Modificar un usuario (actualizar información)
router.put("/usuarios/:id", updateUser);

// Dar de baja un usuario (cambiar a inactivo)
router.put("/usuarios/:id/baja", deactivateUser);

// Reactivar un usuario (cambiar a activo)
router.put("/usuarios/:id/activar", activateUser);

export default router; 
