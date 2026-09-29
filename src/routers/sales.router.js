import { Router } from "express";
import { validarSchema } from "../middlewares/validador.Handler.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validacionRoles } from "../middlewares/validar.roles.js";
import { PERMISOS } from "../config/roles.js";

import { createInvoiceSchema, createPaymentSchema } from "../schemas/sales.schemas.js";
import { 
    createSale, 
    getInvoices, 
    getInvoiceById, 
    getActiveCredits, 
    addPayment 
} from "../controllers/sales.controller.js";

const router = Router();

// ================= FACTURACIÓN =================
// Si pasas ?clienteId=1 en la URL, filtra solo las de ese cliente
router.get('/invoices', verificarToken, validacionRoles(PERMISOS.LEER_VENTAS), getInvoices);
router.get('/invoices/:id', verificarToken, validacionRoles(PERMISOS.LEER_VENTAS), getInvoiceById);

router.post('/invoices', 
    verificarToken, 
    validacionRoles(PERMISOS.CREAR_VENTAS), 
    validarSchema(createInvoiceSchema, 'body'), 
    createSale
);

// ================= CARTERA (CRÉDITOS Y ABONOS) =================
// Si pasas ?clienteId=1 en la URL, filtra los créditos activos de ese cliente
router.get('/credits', verificarToken, validacionRoles(PERMISOS.LEER_VENTAS), getActiveCredits);

router.post('/credits/:id/payments', 
    verificarToken, 
    validacionRoles(PERMISOS.CREAR_VENTAS), 
    validarSchema(createPaymentSchema, 'body'), 
    addPayment
);

export default router;