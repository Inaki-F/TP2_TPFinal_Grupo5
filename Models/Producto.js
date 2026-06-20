import { DataTypes, Model} from "sequelize";
import sequelize from "../connection/sequelize.js";
import ProductoBase from "./ProductoBase.js";

class Producto extends Model {
    async getPrecioFinal() {
        return this.precio;
    }
}

Producto.init(
    {
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: { len: [3, 100] }
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { len: [10, 500] }
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: { min: 0 }
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: { min: 0 }
        },
        categoriaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categorias',
                key: 'id'
            }
        },
        fechaSalida: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
                habilitado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: "Producto",
        tableName: "productos",
        timestamps: false
    }
);

export default Producto;