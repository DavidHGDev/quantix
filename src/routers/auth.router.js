import { Router } from "express";
import { authLogin } from "../controllers/auth.controller.js";

const router = Router();

router.post('/', authLogin);

export default router;
