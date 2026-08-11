import e from "express";
import * as z from 'zod';
import { es } from "zod/locales";
import { errorHandler } from "./middlewares/error.Handler.js";
import routerApp from './routers/index.js'

// Se configura Zod de forma global para traducir los errores a español
z.config(es());

const PORT = 3000;

const app = e();

//Se utiliza el formato Json para que el backend pueda entender el formato. 
app.use(e.json());

//Se direcciona el tráfico que entra para el manejador de rutas. 
app.use(routerApp);

//Middleware para capturar errores, GLOBALES. 
app.use(errorHandler);

//Se escucha sobre el puerto específico, cuando se levanta el servidor. 
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT} http://localhost:${PORT}`)
})