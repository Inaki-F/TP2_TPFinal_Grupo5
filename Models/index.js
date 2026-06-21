import Categoria from "./Categoria.js";
import Producto from "./Producto.js";
import Promocion from "./Promocion.js";
import PromocionCategoria from "./PromocionCategoria.js";
import PromoProducto from "./PromoProducto.js"

Categoria.hasMany(Producto, { foreignKey: "categoriaId" });
Producto.belongsTo(Categoria, {  foreignKey: "categoriaId",  as: 'categoria' });

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

export { Producto, Categoria, Promocion, PromocionCategoria, PromoProducto };