import express from 'express';
import session from 'express-session'; 
import { PORT } from './config.js';
import vendedoresRoutes from './routes/vendedores.routes.js';

const app = express();

// Configuración del middleware de sesiones
app.use(session({
    secret: 'tu_secreto_aqui', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.json());
app.use(vendedoresRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
