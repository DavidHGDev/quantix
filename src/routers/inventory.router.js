import { Router } from "express";
import { validarSchema } from "../middlewares/validador.Handler.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validacionRoles } from "../middlewares/validar.roles.js";
import { PERMISOS } from "../config/roles.js";

import { createCategorySchema, createSupplierSchema, createProductSchema, updateProductSchema } from "../schemas/inventory.schemas.js";
import { 
    getCategories, createCategory, 
    getSuppliers, createSupplier, 
    getProducts, createProduct, updateProduct, toggleProduct 
} from "../controllers/inventory.controller.js";

const router = Router();

// ================= RUTAS LECTURA (Admin y Vendedor) =================
router.get('/categories', verificarToken, validacionRoles(PERMISOS.LEER_INVENTARIO), getCategories);
router.get('/suppliers', verificarToken, validacionRoles(PERMISOS.LEER_INVENTARIO), getSuppliers);
router.get('/products', verificarToken, validacionRoles(PERMISOS.LEER_INVENTARIO), getProducts);

// ================= RUTAS ESCRITURA (Solo Admin) =================
router.post('/categories', 
    verificarToken, 
    validacionRoles(PERMISOS.ESCRIBIR_INVENTARIO), 
    validarSchema(createCategorySchema, 'body'), 
    createCategory
);

router.post('/suppliers', 
    verificarToken, 
    validacionRoles(PERMISOS.ESCRIBIR_INVENTARIO), 
    validarSchema(createSupplierSchema, 'body'), 
    createSupplier
);

router.post('/products', 
    verificarToken, 
    validacionRoles(PERMISOS.ESCRIBIR_INVENTARIO), 
    validarSchema(createProductSchema, 'body'), 
    createProduct
);

router.patch('/products/:id', 
    verificarToken, 
    validacionRoles(PERMISOS.ESCRIBIR_INVENTARIO), 
    validarSchema(updateProductSchema, 'body'), 
    updateProduct
);

// Soft Delete (Activar/Inactivar Producto)
router.patch('/products/:id/status', 
    verificarToken, 
    validacionRoles(PERMISOS.ELIMINAR_INVENTARIO), 
    toggleProduct
);

export default router;