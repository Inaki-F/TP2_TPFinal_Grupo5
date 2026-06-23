import UsuarioService from "../services/UsuarioService.js";
import UsuarioController from "../controllers/UsuarioController.js";
import { Usuario, Rol, Carrito } from "../Models/index.js"; 

const usuarioServicio = new UsuarioService(Usuario, Rol, Carrito);
const usuarioController = new UsuarioController(usuarioServicio);

export default usuarioController;