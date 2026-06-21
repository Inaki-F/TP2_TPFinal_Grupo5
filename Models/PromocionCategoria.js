import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class PromocionCategoria extends Model {}

PromocionCategoria.init(
    {
        promocionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Promociones",
                key: "id",
            },
        },
        categoriaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Categorias",
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "PromocionCategoria",
        tableName: "promociones_categorias",
        timestamps: false
    }
);

export default PromocionCategoria;