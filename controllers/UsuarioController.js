class UsuarioController {
  constructor(servicio) {
    this.usuarioServicio = servicio;
  }

  obtenerTodosUsuarios = async (req, res) => {
    try {
      const usuarios = await this.usuarioServicio.obtenerTodosUsuarios();
      res.status(200).send({ success: true, message: usuarios });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  obtenerUsuarioPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await this.usuarioServicio.obtenerUsuarioPorId(id);
      res.status(200).send({ success: true, message: usuario });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  crearUsuario = async (req, res) => {
    try {
      const { nombre, email, password, roleId } = req.body;
      if (!nombre) throw new Error("nombre is required");
      
      const usuario = await this.usuarioServicio.crearUsuario({ nombre, email, password, roleId });
      res.status(200).send({ success: true, message: usuario });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  actualizarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, email, password, roleId } = req.body;
      const usuario = await this.usuarioServicio.actualizarUsuario(id, { nombre, email, password, roleId });
      res.status(200).send({ success: true, message: usuario });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  eliminarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const resultado = await this.usuarioServicio.eliminarUsuario(id);
      res.status(200).send({ success: true, message: resultado });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const dataUsuario = await this.usuarioServicio.login({email, password});
      res.cookie("payload", dataUsuario.token);
      res.status(200).send({ success: true, message: dataUsuario.id });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  me = async (req, res) => {
    try {
      const usuarioLogueado = req.autenticar;
      res.status(200).send({ success: true, message: usuarioLogueado });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  
  obtenerSoloClientes = async (req, res) => {
    try {
      const clientes = await this.usuarioServicio.obtenerSoloClientes();
      res.status(200).send({ success: true, message: clientes });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default UsuarioController;