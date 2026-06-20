import { Router } from "express";
import { productoUnificadoController } from "../containers/productoUniContainer.js";

const router = Router();

router.get("/", productoUnificadoController.getAll);

export default router