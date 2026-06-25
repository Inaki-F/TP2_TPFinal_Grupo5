import { Router } from "express";
import { carritoController } from "../containers/carritoContainer.js";
import autenticar from "../middlewares/autenticar.js";

const router = Router();

router.use(autenticar);

router.get("/", carritoController.obtenerCarrito);
router.post("/agregar-producto", carritoController.agregarProducto);
router.post("/agregar-promocion", carritoController.agregarPromocion);
router.delete("/eliminar-item", carritoController.eliminarItem);
router.delete("/vaciar", carritoController.vaciarCarrito);

export default router;