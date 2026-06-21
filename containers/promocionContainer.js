import PromocionService from "../services/promocionService.js";
import PromocionController from "../controllers/PromocionController.js";
import { Promocion, Producto, Categoria, PromocionCategoria, PromoProducto } from "../models/index.js";

const promocionService = new PromocionService(
  Promocion,
  Producto,
  Categoria,
  PromocionCategoria,
  PromoProducto
);

const promocionController = new PromocionController(promocionService);

export { promocionService, promocionController };