import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../connection/sequelize.js";

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
       validate: {
        isEmail: true,
        notEmpty: true,
        isValidEmail(value) {
          // No espacios
          if (/\s/.test(value)) {
            throw new Error("El email no puede contener espacios.");
          }
          // Caracteres permitidos
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            throw new Error("El email contiene caracteres no permitidos.");
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
        validate: {
          len: [8, 255],
          is: {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            msg: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@, $, !, %, *, ?, &)"
          }
  }
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2, // 1: Admin, 2: Cliente, 3: Empleado
    },
  },
  {
    sequelize: sequelize,
    modelName: "Usuario",
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

export default Usuario;