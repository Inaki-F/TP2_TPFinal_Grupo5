import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Carrito extends Model {}

Carrito.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  {
    sequelize: sequelize,
    modelName: "Carrito",
    timestamps: false,
  }
);

export default Carrito;