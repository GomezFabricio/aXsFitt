import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import vendedoresRoutes from './routes/vendedores.routes.js';  // Importa las rutas de vendedores
import clientesRoutes from './routes/clientes.routes.js';      // Importa las rutas de clientes

const app = express();

// Configurar CORS para permitir las solicitudes desde tu front-end
app.use(cors({
    origin: 'http://localhost:5173'  // Cambia esta URL si es necesario
}));

// Middleware para manejar JSON
app.use(express.json());

// Usar las rutas para vendedores
app.use(vendedoresRoutes);

// Usar las rutas para clientes
app.use(clientesRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
