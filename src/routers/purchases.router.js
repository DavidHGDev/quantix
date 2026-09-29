import { Router } from "express";
import { validarSchema } from "../middlewares/validador.Handler.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validacionRoles } from "../middlewares/validar.roles.js";
import { PERMISOS } from "../config/roles.js";

import { orderSchema, updateOrderStatusSchema } from "../schemas/purchases.schemas.js";
import { getAllOrders, getOrder, createOrder, updateOrder, updateOrderStatus } from "../controllers/purchases.controller.js";

// Asegúrate de agregar LEER_COMPRAS y ESCRIBIR_COMPRAS en tu archivo de roles.js
const router = Router();

router.get('/orders', verificarToken, validacionRoles(PERMISOS.LEER_COMPRAS), getAllOrders);
router.get('/orders/:id', verificarToken, validacionRoles(PERMISOS.LEER_COMPRAS), getOrder);

router.post('/orders', 
    verificarToken, 
    validacionRoles(PERMISOS.ESCRIBIR_COMPRAS), 
    validarSchema(orderSchema, 'body'), 
    createOrder
);

// Actualizar productos de la orden (Solo si está PENDIENTE)
router.put('/orders/:id', 
    verificarToken, 
    validacionRoles(PERMISOS.ESCRIBIR_COMPRAS), 
    validarSchema(orderSchema, 'body'), 
    updateOrder
);

// Cambiar estado a RECIBIDA o CANCELADA (Dispara actualización de stock)
router.patch('/orders/:id/status', 
    verificarToken, 
    validacionRoles(PERMISOS.ESCRIBIR_COMPRAS), 
    validarSchema(updateOrderStatusSchema, 'body'), 
    updateOrderStatus
);

export default router;
