import { Op } from "sequelize";

class ProductoSimpleService {
  constructor(productoModel, categoriaModel) {
    this.producto = productoModel;
    this.categoria = categoriaModel;
  }

  getAll = async () => {
    const productos = await this.producto.findAll({
      include: [{  model: this.categoria, as: 'categoria', attributes: ['id', 'nombre'] }]
  });
    return productos;
  };

  getProductosActivos  = async () => {
    const productos = await this.producto.findAll({
      where : { habilitado: true, stock: { [Op.gt]: 0 } },
      include: [{  model: this.categoria, as: 'categoria', attributes: ['id', 'nombre'] }]
  });
    return productos;
  };

  getById = async (id) => {
    const producto = await this.producto.findByPk(id, {
      include: [{  model: this.categoria, as: 'categoria', attributes: ['id', 'nombre', 'descripcion'] }]
    });
    if (!producto) throw new Error('Producto no encontrado');
    return producto;
  };


  create = async (data) => {
      const categoria = await this.categoria.findByPk(data.categoriaId);
      if (!categoria) throw new Error('Categoría inválida');
      try{
        const producto = await this.producto.create(data);
      return producto;
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  };

  update = async (id, data) => {
    try {
      const producto = await this.producto.findByPk(id);
      if (!producto) throw new Error('Producto no encontrado');
        const categoria = await this.categoria.findByPk(data.categoriaId);
        if (!categoria) throw new Error('Categoría inválida: no existe');
      await producto.update(data);
      return producto;
    } catch (error) {
        throw new Error(`Error al actualizar producto: ${error.message}`);
    }
};

  desactivar = async (id) => {
    try {
      const producto = await this.producto.findByPk(id);
      if (!producto) throw new Error('Producto no encontrado');
      await producto.update({ habilitado: false });
      return producto;
    } catch (error) {
        throw new Error(`Error al desactivar producto: ${error.message}`);
    }
  };

  reactivar = async (id) => {
    try {
      const producto = await this.producto.findByPk(id);
      if (!producto) throw new Error('Producto no encontrado');
      await producto.update({ habilitado: true });
      return producto;
    } catch (error) {
      throw new Error(`Error al desactivar producto: ${error.message}`);
    }
  };
}



export default ProductoSimpleService;