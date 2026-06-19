const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../../connection/connection");

class Usuario extends Model {}

Usuario.init(
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2, // 1: Admin, 2: Cliente, 3: Empleado
    },
  },
  {
    sequelize: sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
    timestamps: false,
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      }
    }
  }
);

module.exports = Usuario;