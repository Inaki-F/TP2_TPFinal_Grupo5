const { Router } = require("express");
const usuarioController = require("../containers/usuarioContainer.js");
// const autenticar = require("../middlewares/autenticar.js");

const usuarioRoutes = Router();

usuarioRoutes.get("/", usuarioController.obtenerTodosUsuarios);
usuarioRoutes.get("/:id", usuarioController.obtenerUsuarioPorId);
usuarioRoutes.get("/clientes", usuarioController.obtenerSoloClientes);
usuarioRoutes.post("/login", usuarioController.login);
usuarioRoutes.post("/", usuarioController.crearUsuario);
usuarioRoutes.put("/:id", usuarioController.actualizarUsuario);
usuarioRoutes.delete("/:id", usuarioController.eliminarUsuario);

module.exports = usuarioRoutes;