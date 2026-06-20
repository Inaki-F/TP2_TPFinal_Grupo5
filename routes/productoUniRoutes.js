import { Router } from "express";
import { productoUniController } from "../containers/productoUniContainer.js";

const router = Router();

router.get("/", productoUniController.getAll);

export default router