FROM node:24.11.0

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente
COPY back/ecommerce-BaptistaJose .

# Compilar NestJS → genera la carpeta dist
RUN npm run build

EXPOSE 3001

# Ejecutar el build compilado
CMD ["npm", "run", "start:prod"]
