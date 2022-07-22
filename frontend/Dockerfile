#Node 
#instala node(lts ultima version) en una version muy pequeña de linux(alpine)
#crearemos un contenedor lts alpine y lo renombramos como build-stage
FROM node:lts-alpine as build-stage

#RUN permite correr comandos
#Los siguientes son los comandos
#En el contenedor crea la carpeta app
RUN mkdir app

#usamos la carpeta creada app para nuestro proyecto
WORKDIR /app

#copiamos el package.json y package-lock en la carpeta app
COPY package.* ./

#INSTALAMOS LOS PAQUETES NPM
RUN npm install

#Copiamos los demas archivos de nuestros directorios en la carpeta app

COPY . .

#Ejecutamos la compilacion

RUN npm run build

#INSTALAMOS UNA VERSION DE NGINX DESDE HUB.DOCKER.COM

FROM nginx:1.21.6-alpine as production-strategy

#elegimos la carpeta app/dist y le pegamos lo que hay en nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

#decimos en el puerto que se abrira la aplicacion
EXPOSE 80

#Ejecutamos comando cmd en la nueva maquina virtual
CMD ["nginx", "-g", "daemon off;"]

