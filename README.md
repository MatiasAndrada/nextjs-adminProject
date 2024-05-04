# PROJECT ADMIN BETA

## Description
Sistema de administración de tareas y usuarios para equipos de trabajo.

## PASOS PARA INICIALIZAR
1. Clonar el repositorio
2. Instalar dependencias con `npm install`
3. Correr el contenedor de docker con `docker-compose up `
4. Ejecutar el comando `npx prisma db push` para crear las tablas en la base de datos
5. Ejecutar el comando `npx prisma generate` para generar los modelos y interfaces de la base de datos en el proyecto
6. Seedear la base de datos con `npm run seed` para crear un usuario de prueba
7. Correr el proyecto con `npm run dev` 
8. Ingresar a `http://localhost:3000/dashboard` para ver el proyecto

### Usuario de prueba
- email: "test@projectAdmin.com"
- password: password

## TECHNOLOGIES
- Next.js
- Prisma ORM
- TypeScript
- Docker
- Auth.js V5 beta
- Zustand
- PostgreSQL
- React


## TO DO
- [x] Create docker-compose
- [x] Auth with Auth.js
- [x] Schema for Prisma
- [x] Seed for Prisma
- [x] Routes for Next.js
- [x] Middleware
- [x] Create Actions
- [x] Create Pages
- [x] Create Components
- [ ] Implement members invite
- [ ] History of actions
- [ ] Notifications
- [ ] Sonners
- [ ] Chat
- [ ] Calendar

 