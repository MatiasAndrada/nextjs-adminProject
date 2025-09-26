# 📊 Project Admin - Sistema de Administración de Tareas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue)](https://www.typescriptlang.org/)

Un sistema moderno de administración de tareas y usuarios diseñado para equipos de trabajo, construido con Next.js y tecnologías de vanguardia.

## Producción
- **URL:** [https://projectadmin.vercel.app/](https://projectadmin.vercel.app/)

## ✨ Características

- 🔐 **Autenticación completa** con Auth.js v5
- 👥 **Gestión de usuarios y equipos**
- 📋 **Sistema de tareas y proyectos**
- 🎨 **Interfaz moderna** con NextUI y Tailwind CSS
- 🌙 **Modo oscuro/claro**
- 📱 **Completamente responsive**
- 🚀 **Alto rendimiento** con Next.js 14
- 🔍 **Búsqueda y filtros avanzados**

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14.2.3** - Framework de React para producción
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework CSS utilitario
- **NextUI** - Componentes de UI modernos
- **Framer Motion** - Animaciones fluidas

### Backend & Base de Datos
- **Prisma ORM** - ORM moderno para TypeScript/JavaScript
- **PostgreSQL** - Base de datos relacional
- **Auth.js v5** - Autenticación completa
- **bcryptjs** - Hashing de contraseñas

### Estado & Validación
- **Zustand** - Gestión de estado ligera
- **React Hook Form** - Formularios performantes
- **Zod** - Validación de esquemas TypeScript-first

### Desarrollo & Deploy
- **Docker** - Containerización
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Vercel** - Plataforma de deploy

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- Docker y Docker Compose
- Git

### Instalación

1. **Fork del repositorio** (ver [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles)

2. **Clona tu fork**
   ```bash
   git clone https://github.com/tu-usuario/nextjs-adminProject.git
   cd nextjs-adminProject
   ```

3. **Instala las dependencias**
   ```bash
   npm install
   ```

4. **Configura la base de datos**
   ```bash
   docker-compose up -d
   ```

5. **Genera el cliente de Prisma y sincroniza el esquema**
   ```bash
   npx prisma generate && npx prisma db push
   ```

6. **Seedea la base de datos**
   ```bash
   npm run seed
   ```

7. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

8. **Abre el navegador** en `http://localhost:3000/dashboard`

### Usuario de Prueba
- **Email:** `test@projectAdmin.com`
- **Contraseña:** `password`

## 📋 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta el linter |
| `npm run seed` | Seedea la base de datos con datos de prueba |
| `npx prisma generate` | Genera el cliente de Prisma |
| `npx prisma db push` | Sincroniza el esquema con la base de datos |

## 🤝 Cómo Contribuir

¡Nos encanta recibir contribuciones! Lee nuestra [Guía de Contribución](./CONTRIBUTING.md) para conocer el proceso.

### Proceso Rápido:
1. **Fork** el proyecto
2. **Crea** una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add: amazing feature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Lineamientos para Pull Requests

- ✅ Mensajes de commit claros y descriptivos
- ✅ Código formateado con Prettier
- ✅ Sin errores de linting
- ✅ Pruebas funcionales
- ✅ Descripción detallada del PR
- ✅ Capturas de pantalla para cambios de UI

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Código de Conducta

Nos comprometemos a fomentar un ambiente abierto y acogedor. Al participar en este proyecto, te comprometes a mantener un comportamiento respetuoso y constructivo. 

**Esperamos que todos los participantes:**
- Usen un lenguaje inclusivo y respetuoso
- Respeten diferentes puntos de vista y experiencias
- Acepten críticas constructivas con gracia
- Se enfoquen en lo que es mejor para la comunidad

**No toleramos:**
- Comentarios despectivos o ataques personales
- Acoso público o privado
- Publicación de información privada sin permiso
- Cualquier otra conducta inapropiada

Los mantenedores del proyecto tienen el derecho y la responsabilidad de eliminar, editar o rechazar contribuciones que no se alineen con este Código de Conducta.

## 🔮 Roadmap

- [ ] Sistema de invitaciones a miembros
- [ ] Historial de acciones y auditoría
- [ ] Sistema de notificaciones en tiempo real
- [ ] Chat integrado para equipos
- [ ] Calendario de tareas y deadlines
- [ ] API REST completa
- [ ] Aplicación móvil

## 🛠️ Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa los [issues existentes](https://github.com/tu-usuario/nextjs-adminProject/issues)
2. Crea un [nuevo issue](https://github.com/tu-usuario/nextjs-adminProject/issues/new) con detalles específicos
3. Únete a nuestras discusiones en [Discussions](https://github.com/tu-usuario/nextjs-adminProject/discussions)

---

⭐ **¡Si este proyecto te parece útil, no olvides darle una estrella!** ⭐