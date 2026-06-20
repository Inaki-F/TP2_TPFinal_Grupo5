import ProductoUnificadoService from "../services/productoUniService.js";
import ProductoUnificadoController from "../controllers/ProductoUniController.js";
import { productoService } from "./productoContainer.js";
import { promocionService } from "./promocionContainer.js";


const productoUnificadoService = new ProductoUnificadoService(
  productoService,
  promocionService
);


const productoUnificadoController = new ProductoUnificadoController(
  productoUnificadoService
);

export { productoUnificadoService, productoUnificadoController };