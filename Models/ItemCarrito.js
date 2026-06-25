import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class ItemCarrito extends Model {}

ItemCarrito.init({
  carritoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "carritos", key: "usuarioId" },
  },
  tipo: {
    type: DataTypes.ENUM("producto", "promocion"),
    allowNull: false,
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "productos", key: "id" },
  },
  promocionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "promociones", key: "id" },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
}, {
  sequelize,
  modelName: "ItemCarrito",
  tableName: "items_carrito",
  timestamps: false,
  validate: {
    eitherProductOrPromotion() {
      if (this.tipo === "producto" && !this.productoId) throw new Error("Falta productoId");
      if (this.tipo === "promocion" && !this.promocionId) throw new Error("Falta promocionId");
    }
  }
});

export default ItemCarrito;