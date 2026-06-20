class ProductoSimpleController {
  constructor(productoSimpleService) {
    this.service = productoSimpleService;
  }

  getAll = async (req, res) => {
    try {
      const productos = await this.service.getAll();
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

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await this.service.getById(id);
      res.status(200).json({
        success: true,
        data: producto,
        message: 'Producto obtenido correctamente'
      });
    } catch (error) {
      if (error.message === 'Producto no encontrado') {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  create = async (req, res) => {
    try {
      const producto = await this.service.create(req.body);
      res.status(201).json({
        success: true,
        data: producto,
        message: 'Producto creado exitosamente'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await this.service.update(id, req.body);
      res.status(200).json({
        success: true,
        data: producto,
        message: 'Producto actualizado correctamente'
      });
    } catch (error) {
      if (error.message === 'Producto no encontrado') {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  };


   desactivate = async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await this.service.desactivar(id);
      res.status(200).json({
        success: true,
        data: producto,
        message: 'Producto desactivado correctamente'
      });
    } catch (error) {
      if (error.message === 'Producto no encontrado') {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  };

  reactivate = async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await this.service.reactivar(id);
      res.status(200).json({
        success: true,
        data: producto,
        message: 'Producto reactivado correctamente'
      });
    } catch (error) {
      if (error.message === 'Producto no encontrado') {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  };
}

export default ProductoSimpleController;