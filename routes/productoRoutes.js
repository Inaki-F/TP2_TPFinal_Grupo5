import { Router } from "express";
import { productoController } from "../containers/productoContainer.js";
import { validateIdParam } from "../middlewares/validateId.js";
import autenticar from "../middlewares/autenticar.js";
import { esAdmin } from "../middlewares/esAdmin.js";
import { esEmpleado } from "../middlewares/esEmpleado.js";


const router = Router();


router.get("/", productoController.getAll);
router.get("/:id", validateIdParam, productoController.getById);
router.post("/", productoController.create);
router.put("/:id", validateIdParam, productoController.update);
router.patch("/:id/desactivar", validateIdParam, productoController.desactivate);
router.patch("/:id/reactivar", validateIdParam, productoController.reactivate);

export default router;