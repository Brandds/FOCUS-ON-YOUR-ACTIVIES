import express from 'express';
import { cadastrar, deleteUsuarioById, update, verificar } from "../controllers/usuarioController.js";
import { autenticarToken } from '../middlewares/auth.js';

const router = express.Router();

router.post("/cadastrar", cadastrar)
router.post("/verificar", verificar)
router.put("/update",autenticarToken, update )
router.delete("/delete/:id",autenticarToken, deleteUsuarioById)


export default router;