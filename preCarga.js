import sequelize from "./connection/sequelize.js";
import {
  Usuario,
  Rol,
  Categoria,
  Producto,
  Promocion,
  PromocionCategoria,
  PromoProducto,
} from "./models/index.js";
import bcrypt from "bcrypt";

const precargarDatos = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida.");

    // ---------- 1. Roles ----------
    const roles = [
      { id: 1, nombre: "admin" },
      { id: 2, nombre: "cliente" },
      { id: 3, nombre: "empleado" },
    ];
    for (const rol of roles) {
      await Rol.findOrCreate({
        where: { id: rol.id },
        defaults: rol,
      });
    }
    console.log("✅ Roles cargados");

    // ---------- 2. Usuario admin ----------
    const passHash = await bcrypt.hash("Admin123!", 10);
    await Usuario.findOrCreate({
      where: { email: "admin@gmail.com" },
      defaults: {
        nombre: "admin",
        email: "admin@gmail.com",
        password: passHash,
        roleId: 1,
      },
    });
    console.log("✅ Usuario admin cargado (admin@gmail.com / Admin123!)");

    // ---------- 3. Categorías (kiosco) ----------
    const categorias = [
      { nombre: "Golosinas", descripcion: "Dulces, chocolates, caramelos" },
      { nombre: "Bebidas", descripcion: "Gaseosas, aguas, jugos" },
      { nombre: "Snacks", descripcion: "Papas fritas, palitos, mix" },
      { nombre: "Almacén", descripcion: "Productos envasados básicos" },
    ];
    const categoriasCreadas = [];
    for (const cat of categorias) {
      const [c] = await Categoria.findOrCreate({
        where: { nombre: cat.nombre },
        defaults: cat,
      });
      categoriasCreadas.push(c);
    }
    console.log("✅ Categorías cargadas");

    // ---------- 4. Productos ----------
    const productosData = [
      {
        nombre: "Chocolate Milka 100g",
        descripcion: "Chocolate con leche",
        precio: 850.0,
        stock: 50,
        categoriaId: categoriasCreadas[0].id, // Golosinas
        habilitado: true,
      },
      {
        nombre: "Caramelo Sugus 1kg",
        descripcion: "Caramelos de fruta surtidos",
        precio: 2500.0,
        stock: 30,
        categoriaId: categoriasCreadas[0].id,
        habilitado: true,
      },
      {
        nombre: "Coca-Cola 2.25L",
        descripcion: "Gaseosa cola 2.25 litros",
        precio: 1800.0,
        stock: 60,
        categoriaId: categoriasCreadas[1].id, // Bebidas
        habilitado: true,
      },
      {
        nombre: "Agua Mineral 500ml",
        descripcion: "Agua mineral sin gas",
        precio: 700.0,
        stock: 100,
        categoriaId: categoriasCreadas[1].id,
        habilitado: true,
      },
      {
        nombre: "Papas Fritas Lay's 120g",
        descripcion: "Papas fritas sabor jamón",
        precio: 1200.0,
        stock: 40,
        categoriaId: categoriasCreadas[2].id, // Snacks
        habilitado: true,
      },
      {
        nombre: "Mix de Palitos 200g",
        descripcion: "Palitos salados surtidos",
        precio: 950.0,
        stock: 35,
        categoriaId: categoriasCreadas[2].id,
        habilitado: true,
      },
      {
        nombre: "Galletitas Oreo 130g",
        descripcion: "Galletitas con relleno de chocolate",
        precio: 1100.0,
        stock: 45,
        categoriaId: categoriasCreadas[0].id,
        habilitado: true,
      },
      {
        nombre: "Gaseosa Sprite 1.5L",
        descripcion: "Gaseosa lima-limón",
        precio: 1400.0,
        stock: 55,
        categoriaId: categoriasCreadas[1].id,
        habilitado: true,
      },
    ];
    const productos = [];
    for (const p of productosData) {
      const [prod] = await Producto.findOrCreate({
        where: { nombre: p.nombre },
        defaults: p,
      });
      productos.push(prod);
    }
    console.log("✅ Productos cargados");

    // ---------- 5. Promociones ----------
    const promocionesData = [
      {
        nombre: "Pack Fiesta",
        descripcion: "Mix de papas, chocolate y gaseosa",
        precio: 3500.0,
        descuento: 10,
        fechaSalida: new Date(),
        fechaFin: new Date("2026-08-31"),
        habilitado: true,
      },
      {
        nombre: "Oferta Bebidas",
        descripcion: "2 Coca-Cola + 1 Agua Mineral por $4000",
        precio: 4000.0,
        descuento: 15,
        fechaSalida: new Date(),
        fechaFin: new Date("2026-07-15"),
        habilitado: true,
      },
    ];
    const promociones = [];
    for (const p of promocionesData) {
      const [promo] = await Promocion.findOrCreate({
        where: { nombre: p.nombre },
        defaults: p,
      });
      promociones.push(promo);
    }
    console.log("✅ Promociones cargadas");

    // ---------- 6. Productos incluidos en promociones ----------
    // Pack Fiesta: Papas (prod4) + Chocolate (prod0) + Gaseosa (prod2)
    await PromoProducto.bulkCreate(
      [
        { promocionId: promociones[0].id, productoId: productos[0].id, cantidad: 1 },
        { promocionId: promociones[0].id, productoId: productos[4].id, cantidad: 1 },
        { promocionId: promociones[0].id, productoId: productos[2].id, cantidad: 1 },
      ],
      { ignoreDuplicates: true }
    );
    // Oferta Bebidas: 2 Coca-Cola + 1 Agua
    await PromoProducto.bulkCreate(
      [
        { promocionId: promociones[1].id, productoId: productos[2].id, cantidad: 2 },
        { promocionId: promociones[1].id, productoId: productos[3].id, cantidad: 1 },
      ],
      { ignoreDuplicates: true }
    );
    console.log("✅ Productos incluidos en promociones cargados");

    // ---------- 7. Categorías de promociones ----------
    // Pack Fiesta: Snacks + Golosinas + Bebidas
    await PromocionCategoria.bulkCreate(
      [
        { promocionId: promociones[0].id, categoriaId: categoriasCreadas[0].id },
        { promocionId: promociones[0].id, categoriaId: categoriasCreadas[1].id },
        { promocionId: promociones[0].id, categoriaId: categoriasCreadas[2].id },
      ],
      { ignoreDuplicates: true }
    );
    // Oferta Bebidas: solo Bebidas
    await PromocionCategoria.bulkCreate(
      [{ promocionId: promociones[1].id, categoriaId: categoriasCreadas[1].id }],
      { ignoreDuplicates: true }
    );
    console.log("✅ Categorías de promociones cargadas");

    console.log("🎉 Precarga completada exitosamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error durante la precarga:", error);
    process.exit(1);
  }
};

precargarDatos();