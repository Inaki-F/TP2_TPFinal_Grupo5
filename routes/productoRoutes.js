import { Router } from "express";
import { productoController } from "../containers/productoContainer.js";
import { validateIdParam } from "../middlewares/validateId.js";
import autenticar from "../middlewares/autenticar.js";
import { esAdmin } from "../middlewares/esAdmin.js";
import { esEmpleado } from "../middlewares/esEmpleado.js";


const router = Router();


router.get("/", autenticar, esEmpleado, productoController.getAll);
router.get("/:id", validateIdParam, productoController.getById);
router.post("/", autenticar,  esAdmin, productoController.create);
router.put("/:id", autenticar, esEmpleado, validateIdParam, productoController.update);
router.patch("/:id/desactivar",  autenticar, esEmpleado, validateIdParam, productoController.desactivate);
router.patch("/:id/reactivar", autenticar, esEmpleado, validateIdParam, productoController.reactivate);

export default router;