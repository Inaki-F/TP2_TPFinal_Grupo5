class PromocionController {
  constructor(promocionService) {
    this.promocionService = promocionService;
  }

   getAll = async (req, res) => {
    try {
      const promociones = await this.promocionService.getAllPromociones();
      res.status(200).json({success: true, data: promociones, message: 'Promociones obtenidas correctamente'});
    } catch (error) {
      res.status(500).json({success: false, error: error.message });
    }
  };

    getActivas = async (req, res) => {
    try {
      const promociones = await this.promocionService.obtenerPromocionesActivas();
      res.status(200).json({success: true, data: promociones, message: 'Promociones obtenidas correctamente'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

   getById = async (req, res) => {
    try {
      const { id } = req.params;
      const promocion = await this.promocionService.getPromocionById(id);
      res.json(promocion);
    } catch (error) {
      if (error.message === 'Promoción no encontrada') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  };


  create = async (req, res) => {
  try {
    const { productosIncluidos, ...data } = req.body;
    const promocion = await this.promocionService.crearPromocion(data, productosIncluidos);
    res.status(201).json({success: true, data: promocion, message: 'Promoción creada exitosamente'
    });
  } catch (error) {
    res.status(400).json({success: false, error: error.message});
  }
};

 update = async (req, res) => {
    try {
      const { id } = req.params;

      const { productosIncluidos, ...data } = req.body;
      const promocion = await this.promocionService.actualizarPromocion(id, data, productosIncluidos);
      res.json(promocion);
    } catch (error) {
      if (error.message === 'Promoción no encontrada') {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  };

desactivate = async (req, res) => {
  try {
    const { id } = req.params;
    await this.promocionService.desactivarPromocion(id);
    res.status(200).json({
      success: true,
      message: 'Promoción desactivada correctamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

 reactivate = async (req, res) => {
    try {
      const { id } = req.params;

      const promocion = await this.promocionService.reactivarPromocion(id);
      res.json(promocion);
    } catch (error) {
      if (error.message === 'Promoción no encontrada') {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  };
}

export default PromocionController;

