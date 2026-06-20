import ProductoService from "../services/productoService.js";
import ProductoController from "../controllers/ProductoController.js";
import { Producto, Categoria } from "../models/index.js";

const productoService = new ProductoService(Producto, Categoria);

const productoController = new ProductoController(productoService);

export { productoService, productoController };
