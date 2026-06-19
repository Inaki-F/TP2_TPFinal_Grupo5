const bcrypt = require("bcrypt");

class UsuarioService {
  constructor(usuario, rol) {
    this.usuario = usuario;
    this.rol = rol;
  }

  obtenerTodosUsuarios = async () => {
    const usuarios = await this.usuario.findAll({
      attributes: ["id", "nombre", "email", "roleId"]
    });
    return usuarios;
  };

  obtenerUsuarioPorId = async (id) => {
    const usuario = await this.usuario.findOne({
      where: { id },
      attributes: ["id", "nombre", "email", "roleId"],
    });
    return usuario;
  };

  crearUsuario = async ({ nombre, email, password, roleId }) => {
    const usuario = await this.usuario.create({ nombre, email, password, roleId });
    return usuario;
  };

login = async (email, password) => {
    const usuarioEncontrado = await this.usuario.findOne({ where: { email } });
    if (!usuarioEncontrado) {
      throw new Error("Credenciales inválidas (Email no encontrado)");
    }
    const esValida = await bcrypt.compare(password, usuarioEncontrado.password);
    if (!esValida) {
      throw new Error("Credenciales inválidas (Contraseña incorrecta)");
    }
    return usuarioEncontrado;
  };

obtenerSoloClientes = async () => {
    const todosLosUsuarios = await this.obtenerTodosUsuarios();
    const clientes = todosLosUsuarios.filter(usuario => usuario.roleId === 2);
    return clientes;
  };
}

module.exports = UsuarioService;