import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import vendedoresRoutes from './routes/vendedores.routes.js';
import loginRoutes from './routes/login.routes.js';
import menuRoutes from './routes/menu.routes.js';
import usuariosRolesRoutes from './routes/usuarios_roles.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import clientesRoues from './routes/clientes.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';
import ventasRoutes from './routes/ventas.routes.js';
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

// Aplica el middleware de autenticación antes de las rutas que requieren autenticación
/* app.use(authMiddleware); // Aplica el middleware de autenticación */

// Rutas que requieren autenticación
app.use(menuRoutes); // La ruta del menú
app.use(vendedoresRoutes); // Las rutas de vendedores requieren autenticación
app.use(usuariosRolesRoutes); // Nuevas rutas para seleccionar y cambiar roles
app.use(usuariosRoutes); // Las rutas de usuarios requieren autenticación
app.use(clientesRoues); // Las rutas de clientes requieren autenticación
app.use(ventasRoutes); // Las rutas de ventas requieren autenticación
app.use(inventarioRoutes); // Las rutas de inventario requieren autenticación

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});