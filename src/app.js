import e from "express";
import * as z from 'zod';
import { es } from "zod/locales";
import { errorHandler } from "./middlewares/error.Handler.js";
import routerApp from './routers/index.js'
import path from 'path';
import { fileURLToPath } from "url";
import cors from 'cors';

// Se configura Zod de forma global para traducir los errores a español
z.config(es());

const PORT = 3000;

const app = e();

//Configuramos cors para evitar que entre cualqueira

app.use(cors({
    //Solo permitir de una dirección
    origin: 'http://127.0.0.1:5500',
    
    //Solo permitimos lo métodos que la API, realmente USA
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],

    //indicamos al navegador que es válido enviar el token en la cabecera
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//Servir carpeta public de forma statica
const __dirfile = fileURLToPath(import.meta.url); // extraemos la url
const __dirname = path.dirname(__dirfile); // convertimos en una dirección legible 
const ruta = path.join(__dirname, '../public'); // Servir la carpeta public, de la ruta

app.use(e.static(ruta)); //aquí servimos la carpeta public

console.log(__dirname)

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