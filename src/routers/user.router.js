import { Router  } from "express";
import { validarSchema } from "../middlewares/validador.Handler.js";
import { createUserSchema, updateUserSchema, idParamsSchema } from "../schemas/user.schemas.js";
import { getUser, createUser, getOneUser, deleteUser } from "../controllers/user.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validacionRoles } from "../middlewares/validar.roles.js";
import { PERMISOS } from "../config/roles.js";

const router = Router();

router.get('/', verificarToken, validacionRoles(PERMISOS.LEER_USUARIOS), getUser);

router.get('/:id',
    validarSchema(idParamsSchema, 'params'),
    getOneUser
)

router.post('/', 
    validarSchema(createUserSchema, 'body'),
    createUser
);

router.delete('/:id',
    validarSchema(idParamsSchema, 'params'),
    deleteUser
);

export default router;