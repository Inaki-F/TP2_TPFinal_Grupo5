import { Router } from "express";
import { categoriaController } from "../containers/categoriaContainer.js";
import { validateIdParam } from "../middlewares/validateId.js";

const router = Router();

router.get("/", categoriaController.getAll);
router.get("/:id", validateIdParam, categoriaController.getById);
router.post("/", categoriaController.create);
router.put("/:id", validateIdParam, categoriaController.update);
router.delete("/:id", validateIdParam, categoriaController.delete);

export default router;
