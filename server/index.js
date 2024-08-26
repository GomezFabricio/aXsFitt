import express from 'express';
import {PORT} from './config.js'
import indexRoutes from './routes/index.routes.js'
import vendedoresRoutes from './routes/vendedores.routes.js';


const app = express()
app.use(express.json())
app.use(vendedoresRoutes)

app.listen(PORT)
console.log(`Server is listening on port ${PORT}`)