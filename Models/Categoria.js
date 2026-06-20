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
    unique: true 
}
}, { 
    sequelize, 
    modelName: "Categoria", 
    tableName: "categorias", 
    timestamps: false
});

export default Categoria;