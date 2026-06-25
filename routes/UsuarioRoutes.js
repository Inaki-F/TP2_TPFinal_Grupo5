import { Router } from "express";
import usuarioController from "../containers/usuarioContainer.js";
import autenticar from "../middlewares/autenticar.js";
import { esAdmin } from "../middlewares/esAdmin.js";
import { esEmpleado } from "../middlewares/esEmpleado.js";
import { validateIdParam } from "../middlewares/validateId.js";

const usuarioRoutes = Router();

// Rutas publicas
usuarioRoutes.post("/login", usuarioController.login);
usuarioRoutes.post("/", usuarioController.crearUsuario);

// Cualquier usuario logueado puede ver su perfil
usuarioRoutes.get("/me", autenticar, usuarioController.me);

// Ruta de staff (admin o empleado)
usuarioRoutes.get("/clientes", autenticar, esEmpleado, usuarioController.obtenerSoloClientes);

// Rutas exclusivas de admin
usuarioRoutes.get("/", autenticar, esAdmin, usuarioController.obtenerTodosUsuarios);
usuarioRoutes.get("/:id", autenticar, esAdmin, validateIdParam, usuarioController.obtenerUsuarioPorId);
usuarioRoutes.put("/:id", autenticar, esAdmin, validateIdParam, usuarioController.actualizarUsuario);
usuarioRoutes.delete("/:id", autenticar, esAdmin, validateIdParam, usuarioController.eliminarUsuario);

export default usuarioRoutes;