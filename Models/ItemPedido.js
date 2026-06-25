import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class ItemPedido extends Model {}

ItemPedido.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "pedidos", key: "id" },
  },
  tipo: {
    type: DataTypes.ENUM("producto", "promocion"),
    allowNull: false,
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  promocionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: "ItemPedido",
  tableName: "items_pedido",
  timestamps: true,
  validate: {
    eitherProductOrPromotion() {
      if (this.tipo === "producto" && !this.productoId) throw new Error("Falta productoId");
      if (this.tipo === "promocion" && !this.promocionId) throw new Error("Falta promocionId");
    }
  }
});

export default ItemPedido;