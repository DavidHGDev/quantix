import { Router } from "express";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import clientRouter from './client.router.js'


const router = new Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/clients', clientRouter)

export default router;





