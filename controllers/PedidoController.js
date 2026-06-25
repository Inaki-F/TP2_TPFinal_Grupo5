class PedidoController {
  constructor(pedidoService) {
    this.pedidoService = pedidoService;
  }

  confirmarPedido = async (req, res) => {
    try {
      const { datosFacturacion, subtotal, costoEnvio } = req.body;
      const pedido = await this.pedidoService.confirmarPedido(
        req.user.id,
        datosFacturacion,
        subtotal,
        costoEnvio
      );
      res.status(201).json({ success: true, data: pedido });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  obtenerPedidosUsuario = async (req, res) => {
    try {
      const pedidos = await this.pedidoService.obtenerPedidosUsuario(req.user.id);
      res.json({ success: true, data: pedidos });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  obtenerPedido = async (req, res) => {
    try {
      const { id } = req.params;
      const pedido = await this.pedidoService.obtenerPedidoPorId(id, req.user.id);
      res.json({ success: true, data: pedido });
    } catch (error) {
      res.status(404).json({ success: false, error: error.message });
    }
  };

  obtenerTodos = async (req, res) => {
    try {
      const pedidos = await this.pedidoService.obtenerTodos();
      res.json({ success: true, data: pedidos });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  actualizarEstado = async (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      if (!estado) return res.status(400).json({ error: "Falta el estado" });
      const pedido = await this.pedidoService.actualizarEstado(id, estado);
      res.json({ success: true, data: pedido });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
}

export default PedidoController;