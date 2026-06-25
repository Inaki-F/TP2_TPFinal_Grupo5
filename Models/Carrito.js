import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Carrito extends Model {}

Carrito.init({
  usuarioId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: { model: "usuarios", key: "id" },
  },
}, {
  sequelize,
  modelName: "Carrito",
  tableName: "carritos",
  timestamps: false,
});

export default Carrito;