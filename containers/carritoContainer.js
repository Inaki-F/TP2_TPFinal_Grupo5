import CarritoService from "../services/carritoService.js";
import CarritoController from "../controllers/carritoController.js";
import { Carrito, ItemCarrito, Producto, Promocion } from "../models/index.js";

const carritoService = new CarritoService(Carrito, ItemCarrito, Producto, Promocion);
const carritoController = new CarritoController(carritoService);

export { carritoService, carritoController };