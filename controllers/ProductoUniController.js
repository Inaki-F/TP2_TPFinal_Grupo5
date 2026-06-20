class ProductoUnificadoController {
  constructor(productoUnificadoService) {
    this.service = productoUnificadoService;
  }

  getAll = async (req, res) => {
    try {
      const { categoriaId, search } = req.query;
      const productos = await this.service.getProductosDisponibles();
      res.status(200).json({
        success: true,
        data: productos,
        message: 'Productos obtenidos correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
}

export default ProductoUnificadoController;