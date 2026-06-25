import PedidoService from "../services/pedidoService.js";
import PedidoController from "../controllers/pedidoController.js";
import { Carrito, ItemCarrito, Pedido, ItemPedido, Producto, Promocion } from "../models/index.js";

const pedidoService = new PedidoService(
  Carrito,
  ItemCarrito,
  Pedido,
  ItemPedido,
  Producto,
  Promocion
);
const pedidoController = new PedidoController(pedidoService);

export { pedidoService, pedidoController };