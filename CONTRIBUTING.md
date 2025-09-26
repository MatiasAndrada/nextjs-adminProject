# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a **Project Admin**! Este documento te guiará a través del proceso para hacer contribuciones exitosas al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Contribución](#proceso-de-contribución)
- [Estándares de Código](#estándares-de-código)
- [Guía de Commits](#guía-de-commits)
- [Pull Requests](#pull-requests)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)

## 📜 Código de Conducta

Al participar en este proyecto, aceptas seguir nuestro [Código de Conducta](README.md#código-de-conducta). Por favor, léelo antes de contribuir.

## 🚀 ¿Cómo puedo contribuir?

Hay muchas maneras de contribuir al proyecto:

### 🐛 Reportando Bugs
- Busca primero en los [issues existentes](https://github.com/tu-usuario/nextjs-adminProject/issues)
- Si no existe, crea un nuevo issue con el template de bug report
- Proporciona información detallada y pasos para reproducir

### 💡 Sugiriendo Nuevas Características
- Abre un issue con el template de feature request
- Describe claramente la funcionalidad y su propósito
- Explica por qué sería útil para el proyecto

### 🔧 Contribuciones de Código
- Corrige bugs existentes
- Implementa nuevas características
- Mejora la documentación
- Optimiza el rendimiento
- Añade tests

### 📚 Documentación
- Mejora el README
- Añade comentarios al código
- Crea ejemplos y tutoriales
- Traduce documentación

## ⚙️ Configuración del Entorno

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **Docker** y **Docker Compose**
- **Git**
- Un editor de código (recomendamos VS Code)

### Configuración Paso a Paso

#### 1. Fork del Repositorio

1. Visita el [repositorio principal](https://github.com/MatiasAndrada/nextjs-adminProject)
2. Haz click en el botón **"Fork"** en la esquina superior derecha
3. Selecciona tu cuenta como destino del fork

#### 2. Clonar tu Fork

```bash
# Clona tu fork (reemplaza 'tu-usuario' con tu nombre de usuario de GitHub)
git clone https://github.com/tu-usuario/nextjs-adminProject.git

# Navega al directorio del proyecto
cd nextjs-adminProject

# Añade el repositorio original como upstream
git remote add upstream https://github.com/MatiasAndrada/nextjs-adminProject.git

# Verifica los remotes
git remote -v
```

#### 3. Instalación de Dependencias

```bash
# Instala las dependencias del proyecto
npm install
```

#### 4. Configuración de la Base de Datos

```bash
# Inicia la base de datos PostgreSQL con Docker
docker-compose up -d

# Espera unos segundos y verifica que esté corriendo
docker-compose ps
```

#### 5. Configuración Inicial

```bash
# Genera el cliente de Prisma y aplica migraciones
npx prisma generate
npx prisma db push

# Seedea la base de datos con datos de prueba
npm run seed
```

#### 6. Verificar la Instalación

```bash
# Inicia el servidor de desarrollo
npm run dev
```

Visita `http://localhost:3000/dashboard` y verifica que todo funcione correctamente.

## 🔄 Proceso de Contribución

### 1. Sincroniza tu Fork

Antes de comenzar cualquier trabajo, asegúrate de que tu fork esté actualizado:

```bash
# Cambia a la rama main
git checkout main

# Obtén los últimos cambios del repositorio original
git fetch upstream

# Mergea los cambios en tu rama main
git merge upstream/main

# Actualiza tu fork en GitHub
git push origin main
```

### 2. Crear una Rama de Trabajo

```bash
# Crea una nueva rama para tu característica/fix
git checkout -b tipo/nombre-descriptivo

# Ejemplos de nombres de rama:
# git checkout -b feature/user-profile
# git checkout -b fix/login-error
# git checkout -b docs/contributing-guide
```

### 3. Realizar Cambios

- Haz tus cambios siguiendo los [estándares de código](#estándares-de-código)
- Asegúrate de que el código compile sin errores
- Ejecuta las pruebas regularmente

```bash
# Verifica que no hay errores de linting
npm run lint

# Ejecuta las pruebas (cuando estén disponibles)
npm test
```

### 4. Commit de Cambios

Sigue nuestra [guía de commits](#guía-de-commits):

```bash
# Añade los archivos modificados
git add .

# Haz commit con un mensaje descriptivo
git commit -m "Add: nueva funcionalidad de perfil de usuario"
```

### 5. Push y Pull Request

```bash
# Sube tu rama a tu fork
git push origin tipo/nombre-descriptivo
```

Luego ve a GitHub y crea un Pull Request.

## 📝 Estándares de Código

### Estructura de Archivos

Mantén la estructura de carpetas existente:

```
├── app/                    # Páginas de Next.js (App Router)
├── components/             # Componentes reutilizables
├── lib/                   # Utilidades y configuraciones
├── prisma/                # Esquema de base de datos
├── actions/               # Server Actions
├── data/                  # Funciones de acceso a datos
├── hooks/                 # Custom React hooks
└── schemas/               # Esquemas de validación Zod
```

### Convenciones de Nomenclatura

- **Archivos de componentes**: PascalCase (`UserProfile.tsx`)
- **Archivos utilitarios**: camelCase (`formatDate.ts`)
- **Carpetas**: kebab-case (`user-profile/`)
- **Variables y funciones**: camelCase (`userData`, `getUserById`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Estilo de Código

#### TypeScript/React
```typescript
// ✅ Bueno
interface UserProfileProps {
  userId: string;
  showActions?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  userId, 
  showActions = true 
}) => {
  const [userData, setUserData] = useState<User | null>(null);
  
  // Lógica del componente...
  
  return (
    <div className="flex flex-col gap-4">
      {/* JSX aquí */}
    </div>
  );
};
```

#### Tailwind CSS
```typescript
// ✅ Usa clases de Tailwind de manera consistente
<div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">

// ❌ Evita estilos inline
<div style={{ display: 'flex', padding: '16px' }}>
```

### Importaciones

```typescript
// ✅ Orden de importaciones
import React from 'react';                    // Librerías externas
import { NextPage } from 'next';              // Next.js
import { Button } from '@/components/ui';     // Componentes locales
import { getUserById } from '@/data/user';    // Utilidades/datos locales
import type { User } from '@/types';          // Tipos
```

## 📧 Guía de Commits

Utilizamos un formato estándar para los mensajes de commit que ayuda a mantener un historial claro:

### Formato

```
Tipo: Descripción breve en presente

Cuerpo opcional con más detalles si es necesario.
Puede incluir múltiples párrafos.

- Lista de cambios específicos
- Si es aplicable

Fixes #123, Closes #456
```

### Tipos de Commit

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `Add` | Nueva funcionalidad | `Add: user authentication system` |
| `Fix` | Corrección de bug | `Fix: resolve login redirect issue` |
| `Update` | Modificación de funcionalidad existente | `Update: improve dashboard performance` |
| `Remove` | Eliminación de código/archivos | `Remove: unused utility functions` |
| `Refactor` | Reestructuración sin cambios funcionales | `Refactor: reorganize component structure` |
| `Style` | Cambios de formato (espacios, etc.) | `Style: format code with prettier` |
| `Docs` | Cambios en documentación | `Docs: update installation guide` |
| `Test` | Añadir o modificar tests | `Test: add user service unit tests` |
| `Chore` | Tareas de mantenimiento | `Chore: update dependencies` |

### Ejemplos de Buenos Commits

```bash
# Funcionalidad nueva
git commit -m "Add: user profile editing functionality

- Create UserProfileForm component
- Add validation schema for profile data
- Implement save/cancel actions
- Add success/error notifications

Closes #42"

# Corrección de bug
git commit -m "Fix: resolve task deletion error

Tasks were not being removed from the UI after deletion
due to incorrect state update in TaskList component.

Fixes #89"

# Actualización de documentación
git commit -m "Docs: improve setup instructions in README

- Add prerequisites section
- Clarify database setup steps
- Include troubleshooting tips"
```

## 🔍 Pull Requests

### Antes de Crear el PR

- [ ] Tu código sigue los estándares del proyecto
- [ ] Has probado los cambios localmente
- [ ] No hay errores de linting (`npm run lint`)
- [ ] Los commits tienen mensajes descriptivos
- [ ] Has actualizado la documentación si es necesario

### Creando el Pull Request

1. **Título**: Sé claro y descriptivo
   ```
   ✅ Add user profile editing functionality
   ✅ Fix task deletion bug in dashboard
   ❌ Updates
   ❌ Fix bug
   ```

2. **Descripción**: Usa el template proporcionado
   ```markdown
   ## ¿Qué hace este PR?
   Breve descripción de los cambios realizados.

   ## Tipo de cambio
   - [ ] Bug fix (cambio que soluciona un issue)
   - [ ] Nueva característica (cambio que añade funcionalidad)
   - [ ] Breaking change (cambio que podría afectar funcionalidad existente)
   - [ ] Documentación

   ## ¿Cómo se puede probar?
   Describe los pasos para probar los cambios:
   1. Paso uno
   2. Paso dos
   3. Resultado esperado

   ## Capturas de pantalla (si aplica)
   Añade capturas antes/después para cambios visuales.

   ## Checklist
   - [ ] Mi código sigue los estándares del proyecto
   - [ ] He realizado una auto-revisión de mi código
   - [ ] He comentado áreas complejas del código
   - [ ] Mis cambios no generan nuevas advertencias
   - [ ] He probado que mi solución funciona
   ```

3. **Labels**: Añade labels apropiados (bug, enhancement, documentation, etc.)

4. **Reviewers**: Solicita revisión de mantenedores

### Proceso de Revisión

- **Sé paciente**: Las revisiones pueden tomar tiempo
- **Responde a comentarios**: Atiende feedback constructivamente
- **Mantén la conversación profesional**: Enfócate en el código, no en la persona
- **Actualiza según feedback**: Haz los cambios solicitados
- **Resuelve conflictos**: Mantén tu rama actualizada con main

### Después de la Aprobación

Una vez que tu PR sea aprobado y mergeado:

1. **Elimina tu rama local**:
   ```bash
   git checkout main
   git branch -d tipo/nombre-descriptivo
   ```

2. **Actualiza tu fork**:
   ```bash
   git pull upstream main
   git push origin main
   ```

## 🐛 Reportar Bugs

### Antes de Reportar

1. **Busca issues existentes** para evitar duplicados
2. **Actualiza a la última versión** y verifica si persiste
3. **Prepara información detallada** sobre el problema

### Template de Bug Report

Cuando crees un nuevo issue para reportar un bug, incluye:

```markdown
## Descripción del Bug
Descripción clara y concisa del problema.

## Pasos para Reproducir
1. Ve a '...'
2. Haz click en '...'
3. Desplázate hasta '...'
4. Ver error

## Comportamiento Esperado
Descripción clara de lo que esperabas que ocurriera.

## Capturas de Pantalla
Si es aplicable, añade capturas para explicar el problema.

## Información del Entorno
- OS: [ej. Windows 10]
- Navegador: [ej. Chrome 119.0]
- Versión del proyecto: [ej. main branch]
- Node.js: [ej. 18.17.0]

## Información Adicional
Cualquier otro contexto sobre el problema.
```

## 💡 Sugerir Mejoras

### Template de Feature Request

```markdown
## ¿Tu request está relacionado con un problema?
Descripción clara del problema. Ej. "Me frustra cuando..."

## Describe la solución que te gustaría
Descripción clara y concisa de lo que quieres que ocurra.

## Describe alternativas consideradas
Descripción de soluciones o características alternativas.

## Contexto adicional
Cualquier otro contexto o capturas sobre la mejora.
```

## ❓ ¿Necesitas Ayuda?

Si tienes preguntas o necesitas ayuda:

1. **Revisa la documentación** existente
2. **Busca en issues cerrados** para soluciones similares
3. **Crea un nuevo issue** con el label "question"
4. **Únete a las discusiones** en el repositorio

## 🎉 ¡Gracias por Contribuir!

Cada contribución, sin importar su tamaño, hace que este proyecto sea mejor. ¡Agradecemos tu tiempo y esfuerzo!

---

**¿Problemas con esta guía?** [Abre un issue](https://github.com/tu-usuario/nextjs-adminProject/issues/new) para ayudarnos a mejorarla.