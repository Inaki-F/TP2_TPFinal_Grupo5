import { Router } from "express";
import productoUniRoutes from "./productoUniRoutes.js";
import productoRoutes from "./productoRoutes.js";
import promocionRoutes from "./promocionRoutes.js"; 
import categoriaRoutes from "./categoriaRoutes.js";

const router = Router();

router.use("/productos", productoUniRoutes);


router.use("/producto", productoRoutes);
router.use("/promociones", promocionRoutes);
router.use("/categorias", categoriaRoutes);



export default router;