import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import fs from 'fs';
import https from 'https';
import { Server } from 'socket.io';
import vendedoresRoutes from './routes/vendedores.routes.js';
import loginRoutes from './routes/login.routes.js';
import menuRoutes from './routes/menu.routes.js';
import usuariosRolesRoutes from './routes/usuarios_roles.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import clientesRoutes from './routes/clientes.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';
import ventasRoutes from './routes/ventas.routes.js';
import mercadopagoRoutes from './routes/mercadopago.routes.js'; 
import personasRoutes from './routes/personas.routes.js';
import authMiddleware from './middlewares/auth.middleware.js';
import webhookRoutes from './routes/webhook.routes.js';
import authRoutes from './routes/auth.routes.js'; 

const app = express();

// Configuración de CORS
app.use(cors({
    origin: '*',  // Permitir todas las solicitudes de origen
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization,x-selected-role-id',
    credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Ruta del webhook (antes del middleware de autenticación)
app.use(webhookRoutes);

// Rutas de autenticación (antes del middleware de autenticación)
app.use(authRoutes);

// Middleware de autenticación
/* app.use(authMiddleware); */

// Rutas del sistema
app.use(loginRoutes);
app.use(menuRoutes);
app.use(vendedoresRoutes);
app.use(usuariosRolesRoutes);
app.use(usuariosRoutes);
app.use(clientesRoutes);
app.use(ventasRoutes);
app.use(inventarioRoutes);
app.use(mercadopagoRoutes); 
app.use(personasRoutes);

// Cargar archivos SSL
const options = {
    key: fs.readFileSync('./certificates/server.key'),
    cert: fs.readFileSync('./certificates/server.crt'),
    passphrase: 'admin123' // La contraseña del archivo SSL
};

// Iniciar el servidor HTTPS
const server = https.createServer(options, app);

// Configurar el servidor de WebSocket
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Server is listening on https://localhost:${PORT}`);
});

export { io };