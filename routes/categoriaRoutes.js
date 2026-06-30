import { Router } from "express";
import { categoriaController } from "../containers/categoriaContainer.js";
import { validateIdParam } from "../middlewares/validateId.js";
import autenticar from "../middlewares/autenticar.js";
import { esAdmin } from "../middlewares/esAdmin.js";
import { esEmpleado } from "../middlewares/esEmpleado.js";

const router = Router();

//Rutas publicas: cualquiera puede ver las categorias para navegar por el catalogo
router.get("/", categoriaController.getAll);
router.get("/:id", validateIdParam, categoriaController.getById);

//Rutas protegidas, cualquier miembro del staff puede crear, editar o eliminar categorias
router.post("/", categoriaController.create);
router.put("/:id", validateIdParam, categoriaController.update);
router.delete("/:id", validateIdParam, categoriaController.delete);

export default router;