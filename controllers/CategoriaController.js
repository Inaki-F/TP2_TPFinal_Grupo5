class CategoriaController {
  constructor(categoriaService) {
    this.service = categoriaService;
  }

  getAll = async (req, res) => {
    try {
      const categorias = await this.service.getAll();
      res.status(200).json({
        success: true,
        data: categorias,
        message: 'Categorías obtenidas correctamente'
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
      const categoria = await this.service.getById(id);
      res.status(200).json({
        success: true,
        data: categoria,
        message: 'Categoría obtenida correctamente'
      });
    } catch (error) {
      if (error.message === 'Categoría no encontrada') {
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
      const categoria = await this.service.create(req.body);
      res.status(201).json({
        success: true,
        data: categoria,
        message: 'Categoría creada exitosamente'
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
      const categoria = await this.service.update(id, req.body);
      res.status(200).json({
        success: true,
        data: categoria,
        message: 'Categoría actualizada correctamente'
      });
    } catch (error) {
      if (error.message === 'Categoría no encontrada') {
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

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.status(200).json({
        success: true,
        message: 'Categoría eliminada correctamente'
      });
    } catch (error) {
      if (error.message === 'Categoría no encontrada') {
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

export default CategoriaController;
