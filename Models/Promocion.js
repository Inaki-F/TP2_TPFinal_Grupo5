import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";


class Promocion extends Model {
    async getPrecioFinal() {
        if (this.descuento && this.descuento > 0) {
            const precioConDescuento = this.precio * (1 - this.descuento / 100);
            return parseFloat(precioConDescuento.toFixed(2));
        }
        return this.precio;
    }
}

Promocion.init(
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
        descuento: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
            validate: { min: 0, max: 100 }
        },
        fechaSalida: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfterNow(value) {
                    const hoy = new Date();
                    hoy.setHours(0, 0, 0, 0);
                    if (value < hoy) {
                        throw new Error("La fecha de inicio debe ser una fecha futura.");
                    }
                }
            }
        },
        fechaFin: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfterStart(value) {
                    if (value < this.fechaInicio) {
                        throw new Error("La fecha de finalización debe ser posterior a la fecha de inicio.");
                    }
                }
            }
        },
        habilitado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        sequelize,
        modelName: "Promocion",
        tableName: "promociones",
        timestamps: false,
        hooks: {
            beforeCreate: (promocion) => {
        promocion.habilitado =
            new Date() >= promocion.fechaSalida &&
            new Date() <= promocion.fechaFin;
    }
        }
    }
);

export default Promocion;