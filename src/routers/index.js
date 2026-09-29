import { Router } from "express";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import clientRouter from './client.router.js'
import inventoryRouter from './inventory.router.js';
import purcherRouter from './purchases.router.js';
import salesRouter from './sales.router.js';


const router = new Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/clients', clientRouter);
router.use('/inventory', inventoryRouter);
router.use('/purchases', purcherRouter);
router.use('/sales', salesRouter);

export default router;





