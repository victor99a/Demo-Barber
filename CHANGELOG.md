# Changelog - Demo Barber

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2024-XX-XX

### Agregado
- Sistema de reservas con calendario interactivo
- Galería de trabajos con diseño responsive
- Sección de testimonios de clientes
- Navegación responsive con menú móvil
- Configuración de pipeline CI/CD con GitHub Actions
- Despliegue automático a Netlify
- Documentación completa (README, AGENTS, CONTRIBUTING)

### Características Técnicas
- Frontend desarrollado con React 19 + TypeScript
- Build tool: Vite 6
- Styling: Tailwind CSS 4
- Animaciones: Framer Motion 12
- Iconografía: Lucide React

### Infrastructure
- GitHub Actions para CI/CD
- Netlify para hosting y CDN
- Estrategia de branching: GitFlow
- Conventional Commits para mensajes de commit

---

## [Unreleased] - Próxima versión

### En desarrollo
- [ ] Implementar autenticación de usuarios
- [ ] Agregar panel de administración
- [ ] Integración con base de datos backend
- [ ] Tests unitarios con Jest/Vitest
- [ ] Sistema de notificaciones

---

## Formato de Entradas

```
### Tipo
- Descripción del cambio (#issue)
```

### Tipos de Cambio

- **Agregado** - Nuevas características
- **Cambiado** - Cambios en funcionalidades existentes
- **Obsoleto** - Funcionalidades que serán eliminadas
- **Eliminado** - Funcionalidades eliminadas
- **Corregido** - Corrección de bugs
- **Seguridad** - Cambios relacionados con seguridad

---

## Cómo leer el changelog

- **Negrita** - Use **negrita** para énfasis
- `Código` - Use código inline para archivos, comandos
- [Enlace]() - Use enlaces para referencias externas

## Ejemplo de Formato

```markdown
## [1.2.0] - 2024-01-15

### Agregado
- Nueva funcionalidad de búsqueda (#10)
- Página de perfil de usuario (#12)

### Corregido
- Bug en el menú móvil en Safari (#11)
- Error de tipado en TypeScript (#13)

### Cambiado
- Actualizado React de 18 a 19
- Migrado de CSS Modules a Tailwind
```

---

**Nota:** Este changelog es un living document. Agrega entradas cuando hagas cambios significativos.
