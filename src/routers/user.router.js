import { Router  } from "express";
import { getUser, createUser, deleteUser } from "../controllers/user.controllers.js";

const router = Router();

router.get('/', getUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);

export default router;