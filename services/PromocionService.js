import { where, Op } from "sequelize";

class PromocionService {
  constructor(promocionModel, productoModel, promocionCategoriaModel, promoProductoModel) {
    this.promocion = promocionModel;
    this.producto = productoModel;
    this.PromocionCategoria = promocionCategoriaModel;
    this.promoProducto = promoProductoModel;
  }

    crearPromocion = async (data, productosIncluidos = []) => {
    try {
      await this._validarProductosExistentes(productosIncluidos);

      const promocion = await this.promocion.create(data);

      const productosAgrupados = this._agruparProductosRepetidos(productosIncluidos);

      if (productosAgrupados.length) {
        const asociaciones = productosAgrupados.map(p => ({
          promocionId: promocion.id,
          productoId: p.id,
          cantidad:  p.cantidad
        }));
        await this.promoProducto.bulkCreate(asociaciones);
      }

      return promocion;
    } catch (error) {
      throw new Error(`Error al crear promoción: ${error.message}`);
    }
  }

_validarProductosExistentes = async (productosIncluidos) => {
    if (!productosIncluidos?.length) return;
    const idsProductos = productosIncluidos.map(p => p.id);
    const productosExistentes = await this.producto.findAll({
      where: { id: idsProductos },
      attributes: ['id']
    });
    const idsExistentes = productosExistentes.map(p => p.id);
    const idsFaltantes = idsProductos.filter(id => !idsExistentes.includes(id));
    if (idsFaltantes.length) {
      throw new Error(`Productos no encontrados: ${idsFaltantes.join(', ')}`);
    }
  };

_agruparProductosRepetidos = (productos) => {
    const agrupados = {};
    productos.forEach(producto => {
      if (agrupados[producto.id]) {
        agrupados[producto.id].cantidad += producto.cantidad || 1;
      } else {
        agrupados[producto.id] = { ...producto, cantidad: 1 };
      }
    });
    return Object.values(agrupados);
  };

  getAllPromociones = async () => {
    const promos = await this.promocion.findAll({ include: [{
      association: 'productosIncluidos',
      attributes: ['id', 'nombre', 'stock'],
      through: { attributes: ['cantidad'] }
    },
  {
        association: 'categorias',
        attributes: ['id', 'nombre']
      }]
  })
  }

  getPromocionById = async (id) => {
  const promocion = await this.promocion.findByPk(id, {
    include: [{
      association: 'productosIncluidos',
      attributes: ['id', 'nombre', 'descripcion', 'stock', 'habilitado'],
      through: { attributes: ['cantidad'] }
    },
  {
        association: 'categorias',
        attributes: ['id', 'nombre', 'descripcion']
      }]
  });
  if (!promocion) throw new Error('Promoción no encontrada');
  return promocion;
};

   getPromocionesActivas = async() => {
      const ahora = new Date();
    const promociones = await this.promocion.findAll({
      attributes: ["id", "nombre", "precio"],
      where: {
        fechaSalida: { [Op.lte]: ahora },
        fechaFin: { [Op.gte]: ahora },
        habilitado: true
      },
      include: [{
      association: 'productosIncluidos',
      attributes: ["id", "nombre", "stock"],
      through: { attributes: ['cantidad'] }
    },
  {
        association: 'categorias',
        attributes: ['id', 'nombre']
      }]
    })
    const promosActivas = promociones.filter(promo => this._revisarStockPromocion(promo))
   }

  _revisarStockPromocion = (promocion) => {
    if (!promocion.productosIncluidos || promocion.productosIncluidos.length === 0) {
      return false;
    }
    return promocion.productosIncluidos.every(producto => {
      const cantidadRequerida = producto.PromoProducto?.cantidad || 1;
        return (producto.stock >= cantidadRequerida) && producto.habilitado;
  })
}

actualizarPromocion = async (id, data, productosIncluidos = null) => {
  try {
    const promocion = await this.promocion.findByPk(id);
    if (!promocion) throw new Error('Promoción no encontrada');

    await promocion.update(data);
    if (productosIncluidos !== null) {
      await this._validarProductosExistentes(productosIncluidos);
      const productosAgrupados = this._agruparProductosRepetidos(productosIncluidos);

      await this.promoProducto.destroy({
        where: { promocionId: id }
      });

        const asociaciones = productosAgrupados.map(p => ({
          promocionId: id,
          productoId: p.id,
          cantidad: p.cantidad
        }));
        await this.promoProducto.bulkCreate(asociaciones);
      
        
    }
    await promocion.reload();
    return promocion;

  } catch {
    throw new Error(`Error al actualizar promoción: ${error.message}`);
  }
}

desactivarPromocion = async (id) => {
  try {
    const promocion = await this.promocion.findByPk(id);
    if (!promocion) throw new Error('Promoción no encontrada');
    await promocion.update({ habilitado: false });
    return promocion;
  } catch (error) {
    throw new Error(`Error al desactivar promoción: ${error.message}`);
  }
};

reactivarPromocion = async (id) => {
  try {
    const promocion = await this.promocion.findByPk(id);
    if (!promocion) throw new Error('Promoción no encontrada');
    await promocion.update({ habilitado: true });
    return promocion;
  } catch (error) {
    throw new Error(`Error al reactivar promoción: ${error.message}`);
  }
};

}