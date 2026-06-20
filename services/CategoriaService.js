class CategoriaService {
  constructor(categoriaModel, productoModel, promocionCategoriaModel) {
    this.categoria = categoriaModel;
    this.producto = productoModel;
    this.promocionCategoria = promocionCategoriaModel;
  }

  getAll = async () => {
    return await this.categoria.findAll();
  };

  getById = async (id) => {
    const categoria = await this.categoria.findByPk(id);
    if (!categoria) throw new Error('Categoría no encontrada');
    return categoria;
  };

  create = async (data) => {
    try {
      const categoria = await this.categoria.create(data);
      return categoria;
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        throw new Error(error.errors.map(e => e.message).join(', '));
      }
      throw new Error(`Error al crear categoría: ${error.message}`);
    }
  };

  update = async (id, data) => {
    try {
      const categoria = await this.categoria.findByPk(id);
      if (!categoria) throw new Error('Categoría no encontrada');
      await categoria.update(data);
      return categoria;
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        throw new Error(error.errors.map(e => e.message).join(', '));
      }
      throw new Error(`Error al actualizar categoría: ${error.message}`);
    }
  };

  delete = async (id) => {
    try {
      const categoria = await this.categoria.findByPk(id);
      if (!categoria) throw new Error('Categoría no encontrada');

      // Check for associated products
      const countProductos = await this.producto.count({ where: { categoriaId: id } });
      if (countProductos > 0) {
        throw new Error('No se puede eliminar la categoría porque tiene productos asociados');
      }

      // Check for associated promotions
      const countPromociones = await this.promocionCategoria.count({ where: { categoriaId: id } });
      if (countPromociones > 0) {
        throw new Error('No se puede eliminar la categoría porque tiene promociones asociadas');
      }

      await categoria.destroy();
      return { id };
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default CategoriaService;
