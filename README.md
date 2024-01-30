# NEXTJS ADMIN PROJECT PRE _ALPHA

## Description

Sistema de administración de tareas y usuarios para equipos de trabajo.

## PASOS PARA INICIALIZAR
1. Clonar el repositorio
2. Instalar dependencias con `npm install`
3. Correr el contenedor de docker con `docker-compose up `
4. Ejecutar el comando `npx prisma db push` para crear las tablas
5. Ejecutar el comando `npx prisma generate` para generar los modelos
6. Seedear la base de datos con `npm run seed`
7. Correr el proyecto con `npm run dev`
8. Ingresar a `http://localhost:3000/dashboard` para ver el proyecto

## Usuarios de prueba
- email: "test@projectAdmin.com"
- password: password