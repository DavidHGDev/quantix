import { Router  } from "express";
import { validarSchema } from "../middlewares/validador.Handler.js";
import { createUserSchema, updateUserSchema, idParamsSchema, adminUpdateUserSchema, passwordUpdate } from "../schemas/user.schemas.js";
import { getUser, createUser, getOneUser, deleteUser, updateUser } from "../controllers/user.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validacionRoles } from "../middlewares/validar.roles.js";
import { PERMISOS } from "../config/roles.js";

const router = Router();

router.get('/', verificarToken, validacionRoles(PERMISOS.LEER_USUARIOS), getUser);

router.get('/:id',
    verificarToken,
    validacionRoles(PERMISOS.LEER_USUARIOS),
    validarSchema(idParamsSchema, 'params'),
    getOneUser
);

router.post('/', 
    verificarToken,
    validacionRoles(PERMISOS.ESCRIBIR_USURIOS),
    validarSchema(createUserSchema, 'body'),
    createUser
);



//Actualizar usuarios con permisos admin, todos los campos
router.patch('/admin/:id',
    verificarToken,
    validacionRoles(PERMISOS.ESCRIBIR_USURIOS),
    validarSchema(idParamsSchema, 'params'),
    validarSchema(adminUpdateUserSchema, 'body'),
    updateUser
);

//Actualizar solo la contraseña
router.patch('/password/:id',
    verificarToken,
    validarSchema(idParamsSchema, 'params'),
    validarSchema(passwordUpdate, 'body'),
    updateUser
);

//Actualizar el mismo usuario
router.patch('/:id', 
    verificarToken,
    //validacionRoles(PERMISOS.ESCRIBIR_USURIOS), //crear función para validar mismo usuario
    validarSchema(idParamsSchema, 'params'),
    validarSchema(updateUserSchema, 'body'),
    updateUser
);

router.delete('/:id',
    verificarToken,
    validacionRoles(PERMISOS.ELIMINAR_USUARIOS),
    validarSchema(idParamsSchema, 'params'),
    deleteUser
);

export default router;