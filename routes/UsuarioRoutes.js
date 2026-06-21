import { Router } from "express";
import usuarioController from "../containers/usuarioContainer.js"; 

const usuarioRoutes = Router();


usuarioRoutes.get("/", usuarioController.obtenerTodosUsuarios);
usuarioRoutes.get("/:id", usuarioController.obtenerUsuarioPorId);
usuarioRoutes.get("/clientes", usuarioController.obtenerSoloClientes);
usuarioRoutes.post("/login", usuarioController.login);
usuarioRoutes.post("/", usuarioController.crearUsuario);
usuarioRoutes.put("/:id", usuarioController.actualizarUsuario);
usuarioRoutes.delete("/:id", usuarioController.eliminarUsuario);

export default usuarioRoutes;