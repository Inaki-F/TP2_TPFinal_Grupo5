# 🛒 TP2 - TP Final | Distribuidora de Kioscos

API REST para gestionar una distribuidora de kioscos. Permite administrar productos, promociones, categorías, carritos de compra y pedidos, incorporando autenticación mediante JWT y control de roles.

---

# 🚀 Tecnologías Utilizadas

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT (JSON Web Token)
* bcrypt
* cookie-parser
* cors
* morgan

---

# ⚙️ Configuración del Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
SERVER_PORT=8000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=tp2-grupo5
DB_PORT=3306
DB_DIALECT=mysql

SECRET=grupo5_secret
```

---

# 📦 Instalación

## 1. Instalar dependencias

```bash
npm install
```

## 2. Configurar la base de datos

Crear una base de datos MySQL con el nombre:

```sql
tp2-grupo5
```

## 3. Precargar datos de prueba (Opcional)

Para generar datos iniciales (roles, usuario administrador, categorías, productos y promociones):

```bash
node --env-file .env preCarga.js
```

### Usuario administrador generado

| Email                                     | Contraseña |
| ----------------------------------------- | ---------- |
| [admin@gmail.com](mail:admin@gmail.com) | Admin123!  |

---

## 4. Iniciar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

La API estará disponible en:

```text
http://localhost:8000
```

---

# 🔐 Autenticación

| Método | Endpoint          | Descripción                            |
| ------ | ----------------- | -------------------------------------- |
| POST   | `/usuarios/login` | Iniciar sesión                         |
| POST   | `/usuarios`       | Registrar usuario                      |
| GET    | `/usuarios/me`    | Obtener perfil del usuario autenticado |

---

# 👥 Gestión de Usuarios

> Acceso exclusivo para administradores.

| Método | Endpoint        | Descripción            |
| ------ | --------------- | ---------------------- |
| GET    | `/usuarios`     | Listar usuarios        |
| GET    | `/usuarios/:id` | Obtener usuario por ID |
| PUT    | `/usuarios/:id` | Actualizar usuario     |
| DELETE | `/usuarios/:id` | Eliminar usuario       |

---

# 📦 Productos

## Públicos

| Método | Endpoint     | Descripción                             |
| ------ | ------------ | --------------------------------------- |
| GET    | `/productos` | Productos simples y promociones activas |

## Administración

| Método | Endpoint                   | Descripción         |
| ------ | -------------------------- | ------------------- |
| GET    | `/producto`                | Listar productos    |
| GET    | `/producto/:id`            | Obtener producto    |
| POST   | `/producto`                | Crear producto      |
| PUT    | `/producto/:id`            | Actualizar producto |
| PATCH  | `/producto/:id/desactivar` | Desactivar producto |
| PATCH  | `/producto/:id/reactivar`  | Reactivar producto  |

---

# 🎁 Promociones

| Método | Endpoint                      | Descripción           |
| ------ | ----------------------------- | --------------------- |
| GET    | `/promociones`                | Promociones activas   |
| GET    | `/promociones/all`            | Todas las promociones |
| GET    | `/promociones/:id`            | Obtener promoción     |
| POST   | `/promociones`                | Crear promoción       |
| PUT    | `/promociones/:id`            | Actualizar promoción  |
| PATCH  | `/promociones/:id/desactivar` | Desactivar promoción  |
| PATCH  | `/promociones/:id/reactivar`  | Reactivar promoción   |

---

# 🏷️ Categorías

| Método | Endpoint          | Descripción          |
| ------ | ----------------- | -------------------- |
| GET    | `/categorias`     | Listar categorías    |
| GET    | `/categorias/:id` | Obtener categoría    |
| POST   | `/categorias`     | Crear categoría      |
| PUT    | `/categorias/:id` | Actualizar categoría |

---

# 🛒 Carrito de Compras

| Método | Endpoint                     | Descripción             |
| ------ | ---------------------------- | ----------------------- |
| GET    | `/carrito`                   | Ver carrito             |
| POST   | `/carrito/agregar-producto`  | Agregar producto        |
| POST   | `/carrito/agregar-promocion` | Agregar promoción       |
| DELETE | `/carrito/eliminar-item`     | Reducir o eliminar ítem |
| DELETE | `/carrito/vaciar`            | Vaciar carrito          |

---

# 📋 Pedidos

| Método | Endpoint              | Descripción         |
| ------ | --------------------- | ------------------- |
| POST   | `/pedidos`            | Confirmar pedido    |
| GET    | `/pedidos`            | Pedidos del usuario |
| GET    | `/pedidos/todos`      | Todos los pedidos   |
| GET    | `/pedidos/:id`        | Detalle de pedido   |
| PATCH  | `/pedidos/:id/estado` | Cambiar estado      |

---

# 🔑 Roles y Permisos

| Rol           | ID | Permisos                                    |
| ------------- | -- | ------------------------------------------- |
| Administrador | 1  | Acceso total al sistema                     |
| Cliente       | 2  | Productos, carrito y pedidos propios        |
| Empleado      | 3  | Gestión de productos, promociones y pedidos |

### Middlewares de autorización

* `autenticar`
* `esAdmin`
* `esEmpleado`

---

# 🛠️ Scripts Disponibles

| Comando            | Descripción                      |
| ------------------ | -------------------------------- |
| `npm run dev`      | Inicia el servidor en desarrollo |
| `npm start`        | Inicia el servidor en producción |
| `node preCarga.js` | Genera datos iniciales           |

---

# 🗄️ Modelo de Datos

### Usuario

* Gestión de usuarios y roles.

### Producto

* Productos simples.
* Precio, stock y categoría.

### Promoción

* Conjunto de productos con descuentos.
* Fechas de vigencia.

### Categoría

* Clasificación de productos.

### Carrito

* Carrito asociado a un usuario.

### ItemCarrito

* Productos o promociones agregados al carrito.

### Pedido

* Información de compra, facturación y total.

### ItemPedido

* Copia de los productos/promociones comprados al momento de confirmar el pedido.

---

