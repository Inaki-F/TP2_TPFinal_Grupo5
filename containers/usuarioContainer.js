import UsuarioService from "../services/UsuarioService.js";
import UsuarioController from "../controllers/UsuarioController.js";

const usuarioServicio = new UsuarioService();
const usuarioController = new UsuarioController(usuarioServicio); 

export default usuarioController;