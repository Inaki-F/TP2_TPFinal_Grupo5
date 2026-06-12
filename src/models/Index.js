const Usuario = require("./Usuario.js");
const Rol = require("./Rol.js");

Rol.hasMany(Usuario, {
  foreignKey: "roleId",
});

Usuario.belongsTo(Rol, {
  foreignKey: "roleId",
});

module.exports = { 
  Usuario, 
  Rol 
};