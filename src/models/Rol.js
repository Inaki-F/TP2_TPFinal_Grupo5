const { DataTypes, Model } = require("sequelize");const 
sequelize = require("../../connection/sequelize.js");

class Rol extends Model {}

Rol.init(
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z]+$/i,
      },
    },
  },
  {
    sequelize: sequelize,
    modelName: "Rol",
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = Rol;