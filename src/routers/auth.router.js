import { Router } from "express";
import { authLogin } from "../controllers/auth.controller.js";
import { loginUser } from "../schemas/user.schemas.js";
import { validarSchema } from "../middlewares/validador.Handler.js";
import { catchAsync } from '../utils/catchAsync.js'

const router = Router();

//Se valida mediante el middleware que la información cumpla los requisitos de un email y una contraseña
router.post('/', validarSchema(loginUser, 'body'), catchAsync(authLogin));

export default router;
