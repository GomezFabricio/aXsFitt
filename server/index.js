import express from 'express';
import cors from 'cors' 
import { PORT } from './config.js';
import vendedoresRoutes from './routes/vendedores.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json());
app.use(vendedoresRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
