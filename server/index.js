import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import vendedoresRoutes from './routes/vendedores.routes.js';
import loginRoutes from './routes/login.routes.js';
import menuRoutes from './routes/menu.routes.js';
import usuariosRolesRoutes from './routes/usuarios_roles.routes.js'; 
import authMiddleware from './middlewares/auth.middleware.js';

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use(loginRoutes); // La ruta de login no requiere autenticación
app.use(authMiddleware); // Aplica el middleware de autenticación para las siguientes rutas
app.use(menuRoutes); // La ruta del menú (autenticación requerida)
app.use(vendedoresRoutes); // Las rutas de vendedores requieren autenticación
app.use(usuariosRolesRoutes); // Nuevas rutas para seleccionar y cambiar roles

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
