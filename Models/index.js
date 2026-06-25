import Categoria from "./Categoria.js";
import Producto from "./Producto.js";
import Promocion from "./Promocion.js";
import PromocionCategoria from "./PromocionCategoria.js";
import PromoProducto from "./PromoProducto.js";
import Usuario from "./Usuario.js";
import Rol from "./Rol.js";
import Carrito from "./Carrito.js";
import ItemCarrito from "./ItemCarrito.js";
import Pedido from "./Pedido.js";
import ItemPedido from "./ItemPedido.js";

// Producto - Categoria
Categoria.hasMany(Producto, { foreignKey: "categoriaId" });
Producto.belongsTo(Categoria, { foreignKey: "categoriaId", as: "categoria" });

// Promocion - Categoria (muchos a muchos)
Promocion.belongsToMany(Categoria, {
  through: PromocionCategoria,
  foreignKey: "promocionId",
  otherKey: "categoriaId",
  as: "categorias"
});
Categoria.belongsToMany(Promocion, {
  through: PromocionCategoria,
  foreignKey: "categoriaId",
  otherKey: "promocionId",
  as: "promociones"
});

// Promocion - Producto (muchos a muchos)
Promocion.belongsToMany(Producto, {
  through: PromoProducto,
  foreignKey: "promocionId",
  otherKey: "productoId",
  as: "productosIncluidos"
});
Producto.belongsToMany(Promocion, {
  through: PromoProducto,
  foreignKey: "productoId",
  otherKey: "promocionId",
  as: "promocionesDondeAparece"
});

// Usuario - Rol
Rol.hasMany(Usuario, { foreignKey: "roleId" });
Usuario.belongsTo(Rol, { foreignKey: "roleId" });

// Carrito - Usuario
Carrito.belongsTo(Usuario, { foreignKey: "usuarioId" });
Usuario.hasOne(Carrito, { foreignKey: "usuarioId" });

// ItemCarrito - Carrito
ItemCarrito.belongsTo(Carrito, { foreignKey: "carritoId" });
Carrito.hasMany(ItemCarrito, { foreignKey: "carritoId" });

// ItemCarrito - Producto / Promocion (polimórfico)
ItemCarrito.belongsTo(Producto, { foreignKey: "productoId", constraints: false });
ItemCarrito.belongsTo(Promocion, { foreignKey: "promocionId", constraints: false });

// Pedido - Usuario
Pedido.belongsTo(Usuario, { foreignKey: "usuarioId" }); 
Usuario.hasMany(Pedido, { foreignKey: "usuarioId" });

// ItemPedido - Pedido
ItemPedido.belongsTo(Pedido, { foreignKey: "pedidoId" });
Pedido.hasMany(ItemPedido, { foreignKey: "pedidoId" });

// ItemPedido - Producto / Promocion (polimórfico)
ItemPedido.belongsTo(Producto, { foreignKey: "productoId", constraints: false });
ItemPedido.belongsTo(Promocion, { foreignKey: "promocionId", constraints: false });

export {
  Producto,
  Categoria,
  Promocion,
  PromocionCategoria,
  PromoProducto,
  Usuario,
  Rol,
  Carrito,
  ItemCarrito,
  Pedido,
  ItemPedido,
};