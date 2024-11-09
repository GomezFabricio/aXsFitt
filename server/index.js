import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import fs from 'fs';
import https from 'https';
import vendedoresRoutes from './routes/vendedores.routes.js';
import loginRoutes from './routes/login.routes.js';
import menuRoutes from './routes/menu.routes.js';
import usuariosRolesRoutes from './routes/usuarios_roles.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import clientesRoutes from './routes/clientes.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';
import ventasRoutes from './routes/ventas.routes.js';
import mercadopagoRoutes from './routes/mercadopago.routes.js'; // Importa la nueva ruta
import authMiddleware from './middlewares/auth.middleware.js';

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'https://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use(loginRoutes);
app.use(authMiddleware);
app.use(menuRoutes);
app.use(vendedoresRoutes);
app.use(usuariosRolesRoutes);
app.use(usuariosRoutes);
app.use(clientesRoutes);
app.use(ventasRoutes);
app.use(inventarioRoutes);
app.use(mercadopagoRoutes); 

// Cargar archivos SSL
const options = {
    key: fs.readFileSync('./certificates/server.key'),
    cert: fs.readFileSync('./certificates/server.crt'),
    passphrase: 'admin123' // La contraseña del archivo SSL
};

// Iniciar el servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is listening on https://localhost:${PORT}`);
});