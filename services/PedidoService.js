import { Carrito, ItemCarrito, Pedido, ItemPedido, Producto, Promocion } from "../models/index.js";

class PedidoService {
  constructor(
    carritoModel,
    itemCarritoModel,
    pedidoModel,
    itemPedidoModel,
    productoModel,
    promocionModel
  ) {
    this.Carrito = carritoModel;
    this.ItemCarrito = itemCarritoModel;
    this.Pedido = pedidoModel;
    this.ItemPedido = itemPedidoModel;
    this.Producto = productoModel;
    this.Promocion = promocionModel;
  }

  async confirmarPedido(usuarioId, datosFacturacion, subtotal, costoEnvio) {
    const carrito = await this.Carrito.findByPk(usuarioId, {
      include: [{ model: this.ItemCarrito }],
    });
    if (!carrito) throw new Error("No hay carrito");
    if (carrito.ItemCarritos.length === 0) throw new Error("El carrito está vacío");

    const pedido = await this.Pedido.create({
      usuarioId,
      fecha: new Date(),
      estado: "Recibido",
      subtotal,
      costoEnvio,
      totalFinal: subtotal + costoEnvio,
      datosFacturacion,
    });

    for (const item of carrito.ItemCarritos) {
      if (item.tipo === "producto") {
        const producto = await this.Producto.findByPk(item.productoId);
        if (!producto) throw new Error(`Producto ${item.productoId} no encontrado`);
        if (producto.stock < item.cantidad) {
          throw new Error(`Stock insuficiente para ${producto.nombre}`);
        }

        await this.ItemPedido.create({
          pedidoId: pedido.id,
          tipo: "producto",
          productoId: item.productoId,
          cantidad: item.cantidad,
          precioUnitario: producto.precio,
        });

        producto.stock -= item.cantidad;
        await producto.save();
      } else if (item.tipo === "promocion") {
        const promocion = await this.Promocion.findByPk(item.promocionId, {
          include: [{ association: "productosIncluidos" }],
        });
        if (!promocion) throw new Error(`Promoción ${item.promocionId} no encontrada`);

        // Descontar stock de productos incluidos
        for (const prodIncluido of promocion.productosIncluidos) {
          const cantidadTotal = prodIncluido.PromoProducto.cantidad * item.cantidad;
          const producto = await this.Producto.findByPk(prodIncluido.id);
          if (!producto) throw new Error(`Producto ${prodIncluido.id} no encontrado`);
          if (producto.stock < cantidadTotal) {
            throw new Error(`Stock insuficiente para ${producto.nombre}`);
          }
          producto.stock -= cantidadTotal;
          await producto.save();
        }

        const precioFinal = await promocion.getPrecioFinal();

        await this.ItemPedido.create({
          pedidoId: pedido.id,
          tipo: "promocion",
          promocionId: item.promocionId,
          cantidad: item.cantidad,
          precioUnitario: precioFinal,
        });
      }
    }

    // Vaciar carrito
    await this.ItemCarrito.destroy({ where: { carritoId: usuarioId } });

    return pedido;
  }

  async obtenerPedidosUsuario(usuarioId) {
    return await this.Pedido.findAll({
      where: { usuarioId },
      include: [{ model: this.ItemPedido }],
      order: [["fecha", "DESC"]],
    });
  }

  async obtenerPedidoPorId(pedidoId, usuarioId = null) {
    const where = { id: pedidoId };
    if (usuarioId) where.usuarioId = usuarioId;
    const pedido = await this.Pedido.findOne({
      where,
      include: [{ model: this.ItemPedido }],
    });
    if (!pedido) throw new Error("Pedido no encontrado");
    return pedido;
  }

  async actualizarEstado(pedidoId, nuevoEstado) {
    const pedido = await this.Pedido.findByPk(pedidoId);
    if (!pedido) throw new Error("Pedido no encontrado");
    pedido.estado = nuevoEstado;
    await pedido.save();
    return pedido;
  }

  async obtenerTodos() {
    return await this.Pedido.findAll({
      include: [{ model: this.ItemPedido }],
      order: [["fecha", "DESC"]],
    });
  }
}

export default PedidoService;