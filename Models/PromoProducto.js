import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class PromoProducto extends Model {}

PromoProducto.init({
    promocionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Promociones', key: 'id' }
    },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Productos', key: 'id' }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    sequelize,
    modelName: 'PromoProducto',
    tableName: 'promos_productos',
    timestamps: false
});

export default PromoProducto;