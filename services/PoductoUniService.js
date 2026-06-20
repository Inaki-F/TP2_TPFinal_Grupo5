class ProductoUnificadoService {
  constructor(productoService, promocionService) {
    this.productoService = productoService;
    this.promocionService = promocionService;
  }

  getProductosDisponibles = async () => {
    const productos = await this.productoService.getProductosActivos();
    const promociones = await this.promocionService.obtenerPromocionesActivas();
    const todos = [...productos, ...promociones];
    todos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return todos;
  };
}

export default ProductoUnificadoService;