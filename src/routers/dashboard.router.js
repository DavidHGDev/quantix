import { Router } from "express";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { getDashboardMetrics } from "../controllers/dashboard.controller.js";

const router = Router();

// Todos los usuarios logueados pueden ver el dashboard (las acciones ya están protegidas en cada vista)
router.get('/', verificarToken, getDashboardMetrics);

export default router;