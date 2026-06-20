import { Router } from "express";
import { promocionController } from "../containers/promocionContainer.js";
import { validateIdParam } from "../middlewares/validateId.js";

const router = Router();

router.get("/all", promocionController.getAll);
router.get("/", promocionController.getActivas);
router.get("/:id", validateIdParam, promocionController.getById);
router.post("/", promocionController.create);
router.put("/:id", validateIdParam, promocionController.update);
router.patch("/:id/desactivar", validateIdParam, promocionController.desactivate);
router.patch("/:id/reactivar", validateIdParam, promocionController.reactivate);

export default router;