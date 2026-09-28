import { Router } from "express";
import { validarSchema } from "../middlewares/validador.Handler.js";
import { createClientSchema, updateClientSchema, idParamsSchema, documentoParamsSchema, emailParamsSchema } from "../schemas/client.schemas.js";
import { getAllClien, getOneClient, createClient, updateClient, deleteClient, getClientByDocument, getClientByEmail } from "../controllers/client.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validacionRoles } from "../middlewares/validar.roles.js";
import { PERMISOS } from "../config/roles.js";

const router = Router();

// Obtener todos los clientes (Admin y Vendedores)
router.get('/', 
    verificarToken, 
    validacionRoles(PERMISOS.LEER_CLIENTES), 
    getAllClien
);

// Buscar por Documento
router.get('/documento/:documento',
    verificarToken,
    validacionRoles(PERMISOS.LEER_CLIENTES),
    validarSchema(documentoParamsSchema, 'params'),
    getClientByDocument
);

// Buscar por Email
router.get('/email/:email',
    verificarToken,
    validacionRoles(PERMISOS.LEER_CLIENTES),
    validarSchema(emailParamsSchema, 'params'),
    getClientByEmail
);

// Obtener un cliente específico (Admin y Vendedores)
router.get('/:id',
    verificarToken,
    validacionRoles(PERMISOS.LEER_CLIENTES),
    validarSchema(idParamsSchema, 'params'),
    getOneClient
);

// Crear un nuevo cliente (Admin y Vendedores)
router.post('/', 
    verificarToken,
    validacionRoles(PERMISOS.ESCRIBIR_CLIENTES),
    validarSchema(createClientSchema, 'body'),
    createClient
);

// Actualizar información de un cliente (Admin y Vendedores)
router.patch('/:id', 
    verificarToken,
    validacionRoles(PERMISOS.ESCRIBIR_CLIENTES),
    validarSchema(idParamsSchema, 'params'),
    validarSchema(updateClientSchema, 'body'),
    updateClient
);

// Inactivar un cliente (Solo Administrador)
router.delete('/:id',
    verificarToken,
    validacionRoles(PERMISOS.ELIMINAR_CLIENTES),
    validarSchema(idParamsSchema, 'params'),
    deleteClient
);

// con la ruta clients, se puede buscar con los parámetros documento o email. (/clients?documento=123)
// export async function getClients(req, res, next) {
//     const { documento, email } = req.query;

//     if (documento) {
//         const cliente = await clientServices.getOneClientForDocument(documento);
//         if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
//         return res.status(200).json(cliente);
//     }

//     if (email) {
//         const cliente = await clientServices.getOneClientForEmail(email);
//         if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
//         return res.status(200).json(cliente);
//     }

//     // Si no viene ningún filtro, retorna todos los clientes
//     const clientes = await clientServices.getAllClien();
//     res.status(200).json(clientes);
// }

export default router;