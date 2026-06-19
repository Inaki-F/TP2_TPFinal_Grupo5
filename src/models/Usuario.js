const {DataTypes} = require('sequelize');
const sequelize = require('../../connection/sequelize.js');

Usuario.init(
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 50],
        is: /^[a-z\s]+$/i,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
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
  }
);

module.exports = Usuario;