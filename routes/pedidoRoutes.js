import { Router } from "express";
import { pedidoController } from "../containers/pedidoContainer.js";
import autenticar from "../middlewares/autenticar.js";
import { esAdmin } from "../middlewares/esAdmin.js";
import { esEmpleado } from "../middlewares/esEmpleado.js";
import { validateIdParam } from "../middlewares/validateId.js";

const router = Router();

router.use(autenticar);

router.post("/", pedidoController.confirmarPedido);
router.get("/", pedidoController.obtenerPedidosUsuario);
router.get("/todos", esEmpleado, pedidoController.obtenerTodos);
router.get("/:id",validateIdParam, pedidoController.obtenerPedido);
router.patch("/:id/estado", esEmpleado, pedidoController.actualizarEstado);

export default router;