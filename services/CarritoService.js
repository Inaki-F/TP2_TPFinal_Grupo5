import { Carrito, ItemCarrito, Producto, Promocion } from "../models/index.js";

class CarritoService {
  constructor(carritoModel, itemCarritoModel, productoModel, promocionModel) {
    this.Carrito = carritoModel;
    this.ItemCarrito = itemCarritoModel;
    this.Producto = productoModel;
    this.Promocion = promocionModel;
  }

  async obtenerOCrearCarrito(usuarioId) {
    let carrito = await this.Carrito.findByPk(usuarioId, {
      include: [{ model: this.ItemCarrito }],
    });
    if (!carrito) {
      carrito = await this.Carrito.create({ usuarioId });
      carrito = await this.Carrito.findByPk(usuarioId, {
        include: [{ model: this.ItemCarrito }],
      });
    }
    return carrito;
  }

  async agregarProducto(usuarioId, productoId, cantidad) {
    const carrito = await this.obtenerOCrearCarrito(usuarioId);
    const producto = await this.Producto.findByPk(productoId);
    if (!producto) throw new Error("Producto no encontrado");

    let item = await this.ItemCarrito.findOne({
      where: { carritoId: usuarioId, productoId, tipo: "producto" },
    });

    if (item) {
      item.cantidad += cantidad;
      await item.save();
    } else {
      item = await this.ItemCarrito.create({
        carritoId: usuarioId,
        tipo: "producto",
        productoId,
        cantidad,
      });
    }

    return this.obtenerOCrearCarrito(usuarioId);
  }

  async agregarPromocion(usuarioId, promocionId, cantidad) {
    const carrito = await this.obtenerOCrearCarrito(usuarioId);
    const promocion = await this.Promocion.findByPk(promocionId);
    if (!promocion) throw new Error("Promoción no encontrada");

    let item = await this.ItemCarrito.findOne({
      where: { carritoId: usuarioId, promocionId, tipo: "promocion" },
    });

    if (item) {
      item.cantidad += cantidad;
      await item.save();
    } else {
      item = await this.ItemCarrito.create({
        carritoId: usuarioId,
        tipo: "promocion",
        promocionId,
        cantidad,
      });
    }

    return this.obtenerOCrearCarrito(usuarioId);
  }

  async eliminarItem(usuarioId, itemId, cantidad = 1) {
    const carrito = await this.obtenerOCrearCarrito(usuarioId);
    const item = await this.ItemCarrito.findOne({
      where: { carritoId: usuarioId, id: itemId },
    });
    if (!item) throw new Error("Ítem no encontrado en el carrito");

    if (item.cantidad <= cantidad) {
      await item.destroy();
    } else {
      item.cantidad -= cantidad;
      await item.save();
    }
    return this.obtenerOCrearCarrito(usuarioId);
  }

  async vaciarCarrito(usuarioId) {
    await this.ItemCarrito.destroy({ where: { carritoId: usuarioId } });
    return this.obtenerOCrearCarrito(usuarioId);
  }
}

export default CarritoService;