import { Router } from "express";
import usuarioController from "../containers/usuarioContainer.js";
import autenticar from "../middlewares/autenticar.js";
import esAdmin from "../middlewares/esAdmin.js";

const usuarioRoutes = Router();

usuarioRoutes.post("/login", usuarioController.login);
usuarioRoutes.post("/", usuarioController.crearUsuario);

usuarioRoutes.get("/me", autenticar, usuarioController.me);

usuarioRoutes.get("/", autenticar, esAdmin, usuarioController.obtenerTodosUsuarios);
usuarioRoutes.get("/clientes", autenticar, esAdmin, usuarioController.obtenerSoloClientes);
usuarioRoutes.get("/:id", autenticar, esAdmin, usuarioController.obtenerUsuarioPorId);
usuarioRoutes.put("/:id", autenticar, esAdmin, usuarioController.actualizarUsuario);
usuarioRoutes.delete("/:id", autenticar, esAdmin, usuarioController.eliminarUsuario);

export default usuarioRoutes;