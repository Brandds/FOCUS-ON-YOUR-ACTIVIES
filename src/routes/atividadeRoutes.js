import express from 'express';
import { cadastrar, deleteAtividadeById, getAllAtividadeUser, update } from '../controllers/atividadeController.js';


const router = express.Router();

router.post("/cadastrar",cadastrar)
router.put("/update",update)
router.post("/allAtividadeUser/:id", getAllAtividadeUser)
router.delete("/delete/:id", deleteAtividadeById)

export default router;
