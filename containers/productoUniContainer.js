import ProductoUniService from "../services/ProductoUniService.js";
import ProductoUniController from "../controllers/ProductoUniController.js";
import { productoService } from "./productoContainer.js";
import { promocionService } from "./promocionContainer.js";


const productoUniService = new ProductoUniService(
  productoService,
  promocionService
);


const productoUniController = new ProductoUniController(
  productoUniService
);

export { productoUniService, productoUniController };