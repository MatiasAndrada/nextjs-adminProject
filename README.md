# PROJECT ADMIN

## Description
Sistema de administración de tareas y usuarios para equipos de trabajo.

## PASOS PARA INICIALIZAR
1. Clonar el repositorio
2. Instalar dependencias con `npm install`
3. Esta configurado el script `postinstall` para generar los modelos de prisma y subir las tablas a la base de datos
4. Correr el contenedor de docker con `docker-compose up `
5. Seedear la base de datos con `npm run seed` para crear un usuario de prueba
6. Correr el proyecto con `npm run dev` 
7. Ingresar a `http://localhost:3000/dashboard` para ver el proyecto

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

## COMMANDS
- `npm i` - Install dependencies
- `postinstall` - Execute after install dependencies to generate Prisma Client types and push schema to database for fewer steps to start the project
- `npx prisma generate` - Generate Prisma Client types and schema
- `npx prisma db push` - Push schema to database
- `npx prisma migrate reset` - Reset migrations and database

## TO DO
- []  Add * in labels for required fields
- [ ] Implement members invite
- [ ] History of actions
- [ ] Notifications
- [ ] Sonners
- [ ] Chat
- [ ] Calendar


 