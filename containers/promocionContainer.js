import PromocionService from "../services/promocionService.js";
import PromocionController from "../controllers/PromocionController.js";
import { Promocion, Producto, PromocionCategoria, PromoProducto } from "../models/index.js";

const promocionService = new PromocionService(
  Promocion,
  Producto,
  PromocionCategoria,
  PromoProducto
);

const promocionController = new PromocionController(promocionService);

export { promocionService, promocionController };