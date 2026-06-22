import { Router } from "express";
import usuarioController from "../containers/usuarioContainer.js";
import autenticar from "../middlewares/autenticar.js";

const usuarioRoutes = Router();


usuarioRoutes.post("/login", usuarioController.login);
usuarioRoutes.post("/", usuarioController.crearUsuario);

usuarioRoutes.get("/me", autenticar, usuarioController.me);

usuarioRoutes.get("/", usuarioController.obtenerTodosUsuarios);
usuarioRoutes.get("/clientes", usuarioController.obtenerSoloClientes);
usuarioRoutes.get("/:id", usuarioController.obtenerUsuarioPorId);
usuarioRoutes.put("/:id", usuarioController.actualizarUsuario);
usuarioRoutes.delete("/:id", usuarioController.eliminarUsuario);

export default usuarioRoutes;