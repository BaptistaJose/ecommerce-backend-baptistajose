# 🛒 Backend E-Commerce – NestJS + TypeORM + PostgreSQL

Este proyecto es una API REST completa para un e-commerce, construida con NestJS, TypeORM, PostgreSQL, Docker, Swagger y manejo de archivos con Cloudinary.

Incluye autenticación, gestión de productos, categorías, órdenes de compra y carga de imágenes.

## 📌 Características Principales

🔐 Autenticación con JWT (login/registro)

👤 Gestión de usuarios

🛍️ CRUD completo de productos

🗂️ CRUD de categorías

🧾 Sistema de órdenes de compra
Con detalle de productos, cantidades y totales

☁️ Carga de imágenes usando Cloudinary

🧱 Migraciones con TypeORM

📄 Documentación automática con Swagger

🐳 Soporte completo para Docker

🧪 Pruebas unitarias con Jest

📦 Arquitectura modular y escalable

## 🏗️ Tecnologías Utilizadas

NestJS

TypeORM

PostgreSQL

Docker & docker-compose

Cloudinary

Swagger

Jest

## 📁 Estructura del Proyecto
src/
│── auth/
│── users/
│── products/
│── categories/
│── orders/
│── cloudinary/
│── common/
│── database/
│── migrations/
│── main.ts
│── app.module.ts

### Entidades principales

User

Product

Category

Order

OrderDetail

## ⚙️ Variables de Entorno

Crea un archivo `.env.development` en la raíz del proyecto con las siguientes variables:

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=proyectom4

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET=your_jwt_secret_here
```

> ⚠️ **Nota:** Nunca commits el archivo `.env` con valores reales. Úsalo solo localmente.

## 🐳 Ejecutar con Docker

### Construir contenedores

```bash
docker-compose build
```

### Levantar el proyecto

```bash
docker-compose up
```

### Ejecutar migraciones dentro del contenedor

```bash
docker exec -it nestapp npm run migration:run
```

## ▶️ Ejecutar en modo desarrollo (sin Docker)

```bash
npm install
npm run start:dev
```

## 🗄️ Migracionesnes

### Crear una nueva migración

```bash
npm run migration:generate --name NombreMigracion
```

### Ejecutar migraciones

```bash
npm run migration:run
```

### Revertir una migración

```bash
npm run migration:revert
```

## 📘 Documentación Swagger

Una vez corriendo: 👉 **http://localhost:8080/api**

**Incluye:**

- Auth
- Users
- Products
- Categories
- Orders
- Image upload

## 🧩 Arquitectura del proyecto

- **Controllers:** manejan las rutas
- **Services:** contienen la lógica de negocio
- **Repositories:** comunicación directa con la base de datos
- **Middleware:** logs y validaciones
- **Decoradores personalizados:** para autorización
- **DTO's:** validación con class-validator
- **Módulos:** organizados por dominioominio

## 📦 Scripts disponibles

```bash
npm run start
npm run start:dev
npm run build
npm run test
npm run migration:generate
npm run migration:run
npm run migration:revert
```

## 📌 Estado del Proyecto

- ✔ Funcional
- ✔ Documentado
- ✔ Estructura modular
- ✔ Preparado para producción
- ✔ Integración con Cloudinary
- ✔ Migraciones funcionando

## 📄 Licencia

Este proyecto es de uso libre para portfolio y aprendizaje.