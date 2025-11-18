FROM node:24.11.0

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente
COPY . .

# Renombrar archivos para que coincidan con los imports (mayúsculas/minúsculas)
RUN mv src/products/product.entity.ts src/products/Product.entity.ts \
 && mv src/categories/category.entity.ts src/categories/Category.entity.ts \
 && mv src/users/user.entity.ts src/users/User.entity.ts \
 && mv src/orders/entities/order.entity.ts src/orders/entities/Order.entity.ts \
 && mv src/orders/entities/orderDetail.entity.ts src/orders/entities/OrderDetail.entity.ts

# Compilar NestJS → genera la carpeta dist
RUN npm run build

EXPOSE 8080

# Ejecutar el build compilado
CMD ["npm", "run", "start:prod"]
