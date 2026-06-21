import CategoriaService from "../services/CategoriaService.js";
import CategoriaController from "../controllers/CategoriaController.js";
import { Categoria, Producto, PromocionCategoria } from "../models/index.js";

const categoriaService = new CategoriaService(Categoria, Producto, PromocionCategoria);

const categoriaController = new CategoriaController(categoriaService);

export { categoriaService, categoriaController };
