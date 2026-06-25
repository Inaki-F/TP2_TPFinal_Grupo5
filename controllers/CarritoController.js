class CarritoController {
  constructor(carritoService) {
    this.carritoService = carritoService;
  }

  obtenerCarrito = async (req, res) => {
    try {
      const carrito = await this.carritoService.obtenerOCrearCarrito(req.user.id);
      res.json({ success: true, data: carrito });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  agregarProducto = async (req, res) => {
    try {
      const { productoId, cantidad } = req.body;
      if (!productoId || !cantidad || cantidad <= 0) {
        return res.status(400).json({ error: "Datos inválidos" });
      }
      const carrito = await this.carritoService.agregarProducto(req.user.id, productoId, cantidad);
      res.json({ success: true, data: carrito });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  agregarPromocion = async (req, res) => {
    try {
      const { promocionId, cantidad } = req.body;
      if (!promocionId || !cantidad || cantidad <= 0) {
        return res.status(400).json({ error: "Datos inválidos" });
      }
      const carrito = await this.carritoService.agregarPromocion(req.user.id, promocionId, cantidad);
      res.json({ success: true, data: carrito });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  eliminarItem = async (req, res) => {
    try {
      const { itemId, cantidad } = req.body;
      if (!itemId) {
        return res.status(400).json({ error: "Falta itemId" });
      }
      const carrito = await this.carritoService.eliminarItem(req.user.id, itemId, cantidad || 1);
      res.json({ success: true, data: carrito });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  vaciarCarrito = async (req, res) => {
    try {
      const carrito = await this.carritoService.vaciarCarrito(req.user.id);
      res.json({ success: true, data: carrito });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export default CarritoController;