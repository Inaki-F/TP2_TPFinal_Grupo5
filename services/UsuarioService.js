import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

class UsuarioService {
  constructor(usuario, rol, carrito) {
    this.usuario = usuario;
    this.rol = rol;
    this.carrito = carrito;
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
    let usuarioCreado = null;
    usuarioCreado = await this.usuario.create({ nombre, email, password, roleId });
    if (!roleId || roleId === 2) {
      await this.carrito.create({ usuarioId: usuarioCreado.id });
    }
    return usuarioCreado;
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
    resultadoLogin = { token, id: usuarioEncontrado.id };
    return resultadoLogin;
  };

obtenerSoloClientes = async () => {
    const todosLosUsuarios = await this.obtenerTodosUsuarios();
    const clientes = todosLosUsuarios.filter(usuario => usuario.roleId === 2);
    return clientes;
  };

actualizarUsuario = async (id, { nombre, email, password, roleId }) => {
    let usuarioActualizado = null;
    const usuarioExistente = await this.usuario.findOne({ where: { id } });
    if (!usuarioExistente) {
      throw new Error("Usuario no encontrado para actualizar");
    }
    await usuarioExistente.update({ nombre, email, password, roleId });
    usuarioActualizado = usuarioExistente;
    return usuarioActualizado;
  };

eliminarUsuario = async (id) => {
    let resultadoEliminacion = false;
    const usuarioExistente = await this.usuario.findOne({ where: { id } });
    if (!usuarioExistente) {
      throw new Error("Usuario no encontrado para eliminar");
    }
    await usuarioExistente.destroy();
    resultadoEliminacion = true;
    return resultadoEliminacion;
  };
}
export default UsuarioService;