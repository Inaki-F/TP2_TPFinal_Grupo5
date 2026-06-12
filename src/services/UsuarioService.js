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

  login = async ({ email, password }) => {
    const usuario = await this.usuario.findOne({
      where: { email },
      attributes: ["id", "nombre", "email", "password", "roleId"],
    });
    
    if (!usuario) throw new Error("usuario not found");

    if (usuario.password !== password) throw new Error("invalid password");
    
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      roleId: usuario.roleId,
    };
  };
}

module.exports = UsuarioService;