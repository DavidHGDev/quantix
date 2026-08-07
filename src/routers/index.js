import { Router } from "express";
import userRouter from "./user.router.js";


const router = new Router();

router.use('/usuarios', userRouter);

export default router;





