
import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Pedido extends Model {}

Pedido.init({
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "usuarios", key: "id" },
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  estado: {
    type: DataTypes.ENUM("Recibido", "Preparando", "En camino", "Listo para retirar", "Entregado", "Cancelado"),
    defaultValue: "Recibido",
  },
  subtotal: DataTypes.DECIMAL(10, 2),
  costoEnvio: DataTypes.DECIMAL(10, 2),
  totalFinal: DataTypes.DECIMAL(10, 2),
  datosFacturacion: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Pedido",
  tableName: "pedidos",
  timestamps: true,
});

export default Pedido;