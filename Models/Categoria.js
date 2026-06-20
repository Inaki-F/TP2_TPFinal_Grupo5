import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Categoria extends Model {}

Categoria.init({
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
},
  nombre: { 
    type: DataTypes.STRING(50), 
    allowNull: false, 
    unique: {
      msg: "El nombre de la categoría ya existe"
    }
},
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: {
              len: {
                args: [10, 255],
                msg: "La descripción debe tener entre 10 y 255 caracteres"
              }
            }
        }
}, { 
    sequelize, 
    modelName: "Categoria", 
    tableName: "categorias", 
    timestamps: false
});

export default Categoria;