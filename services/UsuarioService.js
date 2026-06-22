import bcrypt from "bcrypt";
import Usuario from "../Models/Usuario.js";
import {generateToken} from "../utils/jwt.js";


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
  let resultadoLogin = null;
  const usuarioEncontrado = await this.usuario.findOne({ where: { email } });
  if (!usuarioEncontrado) {
    throw new Error("Usuario no encontrado");
  }
  const esValida = await bcrypt.compare(password, usuarioEncontrado.password);
  if (!esValida) {
    throw new Error("Contraseña incorrecta");
  }
  const payload = {
    id: usuarioEncontrado.id,
    nombre: usuarioEncontrado.nombre,
    roleId: usuarioEncontrado.roleId,
  };
  const token = generateToken(payload);
  resultadoLogin = { token, id: usuarioEncontrado.id};
  return resultadoLogin;
};

obtenerSoloClientes = async () => {
    const todosLosUsuarios = await this.obtenerTodosUsuarios();
    const clientes = todosLosUsuarios.filter(usuario => usuario.roleId === 2);
    return clientes;
  };
}

export default UsuarioService;