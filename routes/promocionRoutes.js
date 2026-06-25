import { Router } from "express";
import { promocionController } from "../containers/promocionContainer.js";
import { validateIdParam } from "../middlewares/validateId.js";
import autenticar from "../middlewares/autenticar.js";
import { esAdmin } from "../middlewares/esAdmin.js";
import { esEmpleado } from "../middlewares/esEmpleado.js";

const router = Router();

router.get("/all", autenticar, esEmpleado, promocionController.getAll);
router.get("/", promocionController.getActivas);
router.get("/:id", validateIdParam, promocionController.getById);
router.use(autenticar);
router.post("/", esAdmin, promocionController.create);
router.put("/:id", esEmpleado, validateIdParam, promocionController.update);
router.patch("/:id/desactivar", esEmpleado, validateIdParam, promocionController.desactivate);
router.patch("/:id/reactivar", esEmpleado, validateIdParam, promocionController.reactivate);

export default router;