# Demo Barber - Barbería Premium

## Badges de Estado

![Build Status](https://github.com/victor99a/Demo-Barber/actions/workflows/deploy.yml/badge.svg?branch=main)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vite](https://img.shields.io/badge/Vite-6.0-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Estrategia de Ramificación - GitFlow](#estrategia-de-ramificación---gitflow)
4. [Guía de Buenas Prácticas](#guía-de-buenas-prácticas)
5. [Flujo de Merge y Pull Requests](#flujo-de-merge-y-pull-requests)
6. [Automatización CI/CD](#automatización-cicd)
7. [Trazabilidad de Cambios](#trazabilidad-de-cambios)
8. [Declaración de Uso de IA](#declaración-de-uso-de-ia)
9. [Reflexiones Individuales](#reflexiones-individuales)
10. [Requisitos e Instalación](#requisitos-e-instalación)
11. [Contribución y Licencia](#contribución-y-licencia)

---

## Descripción del Proyecto

### Microservicio Seleccionado: Frontend de Barbería

**Demo Barber** es una aplicación web frontend desarrollada para una barbería premium que proporciona las siguientes funcionalidades:

| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| Sistema de Reservas | Calendario interactivo con selección de fecha y hora | Alta |
| Catálogo de Servicios | Visualización de servicios con precios y duración | Alta |
| Galería de Trabajos | Galería de imágenes del establecimiento | Media |
| Testimonios | Reseñas y testimonios de clientes | Media |
| Diseño Responsive | Interfaz adaptable a dispositivos móviles | Alta |

### Stack Tecnológico

```
Frontend:
├── React 19.0.0        - Framework UI
├── TypeScript 5.8      - Tipado estático
├── Vite 6.2.0          - Bundler y dev server
├── Tailwind CSS 4.1    - Framework CSS
├── Framer Motion 12    - Animaciones
└── Lucide React        - Iconografía

Infraestructura:
├── GitHub              - Control de versiones
├── GitHub Actions      - CI/CD
└── Netlify             - Hosting y CDN
```

### Enlace al Proyecto

🔗 **URL en Producción:** [[https://demo-barber.netlify.app](https://demo-barber.netlify.app](https://vabdemobarber.netlify.app/))

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────┐
│                   NAVEGADOR USUARIO                 │
│              (Chrome, Firefox, Safari)              │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                  CDN - NETLIFY                      │
│           (distribución global de assets)           │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              REPOSITORIO GITHHUB                    │
│         victor99a/Demo-Barber (main)                │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐                 │
│  │   GitHub     │  │  GitHub      │                 │
│  │   Actions    │──│  Repository  │                 │
│  │  (CI/CD)     │  │  (Code)      │                 │
│  └──────────────┘  └──────────────┘                 │
└─────────────────────────────────────────────────────┘
```

### Flujo de Datos

1. **Desarrollo Local** → Desarrollador escribe código
2. **Push a GitHub** → Código se sube al repositorio
3. **GitHub Actions** → Pipeline automático ejecuta tests y build
4. **Deploy a Netlify** → Si main se actualiza, se despliega automáticamente

---

## Estrategia de Ramificación - GitFlow

### 1.1 Justificación de GitFlow sobre Trunk-Based Development

| Criterio | GitFlow ✅ | Trunk-Based ⚠️ |
|----------|-----------|----------------|
| **Entornos múltiples** | Main, Develop, Release | Solo main |
| **Características incompletas** | Aisladas en feature branches | Merged a main (FFE) |
| **Hotfixes urgentes** | Rama hotfix dedicada | Directly to main |
| **Control de versiones** | Semántico por release | Continuous delivery |
| **Colaboración equipo** | clara separación | Requiere feature flags |
| **Riesgo de deploy** | Bajo (QA en develop) | Alto (directo a prod) |

### 1.2 Ventajas Técnicas en Entornos Colaborativos

#### **Por qué GitFlow:**

1. **Aislamiento de Features**
   - Cada nueva funcionalidad se desarrolla en una rama independiente
   - Permite múltiples features en paralelo sin afectar la rama principal
   - Código incompleto nunca llega a producción

2. **Control de Calidad**
   - Rama `develop` actúa como pre-producción
   - Pull Requests permiten code review exhaustivo
   - Tests se ejecutan antes del merge

3. **Gestión de Versiones**
   - Tags semánticos para cada release
   - Posibilidad de rollback rápido
   - Historial claro de cambios

4. **Hotfixes sin Interrupciones**
   - Bugs críticos se arreglan sin esperar el ciclo de desarrollo
   - Se merging a ambas ramas (main y develop)
   - Despliegue inmediato a producción

#### **En Entornos de Nube:**

- **Despliegue continuo pero controlado**: Main → Netlify se hace solo cuando el código está listo
- **Rollback rápido**: Si hay problemas, se puede volver al tag anterior
- **Ambientes separados**: Develop para pruebas, Main para producción


## Guía de Buenas Prácticas

### 3.1 Naming de Ramas

| Tipo de Rama | Formato | Ejemplo | Descripción |
|--------------|---------|---------|-------------|
| **Main** | `main` | `main` | Rama principal de producción |
| **Develop** | `develop` | `develop` | Rama de integración |
| **Feature** | `feature/[descripcion-corta]` | `feature/reservas-calendario` | Nueva funcionalidad |
| **Hotfix** | `hotfix/[descripcion-corta]` | `hotfix/arreglo-responsive` | Corrección urgente |
| **Release** | `release/v[semver]` | `release/v1.0.0` | Preparación de versión |

#### Reglas de Naming:

✅ **Correcto:**
```bash
feature/reservas-calendario
feature/autenticacion-usuarios
hotfix/error-login-movil
release/v1.2.0
```

❌ **Incorrecto:**
```bash
feature/nueva-funcion          # Too vague
feature/RESERVAS               # ALL CAPS
feature/feature-reserva        # Redundant
hotfix/fix                     # Too short
```

## Flujo de Merge y Pull Requests

### 4.1 Proceso de Merge

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Feature    │     │  Develop    │     │    Main     │     │  Producción │
│  Branch     │────▶│  (Merge)    │────▶│  (Merge)    │────▶│  (Deploy)   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │                   │
      │   Pull Request    │   Pull Request    │   Push/Tag        │
      │   + Code Review   │   + Code Review   │   + Auto Deploy   │
      │   + CI Tests      │   + CI Tests      │                   │
```

### 4.2 Flujo de Feature:

```bash
# 1. Crear rama desde develop
git checkout develop
git pull origin develop
git checkout -b feature/nueva-funcionalidad

# 2. Desarrollar y hacer commits
git add .
git commit -m "feat(scope): descripción clara"
git push origin feature/nueva-funcionalidad

# 3. Crear Pull Request en GitHub
# - Título: feat(scope): descripción
# - Descripción: Qué cambió y por qué
# - Asignar reviewers
# - Link a issue si existe

# 4. Esperar aprobación y CI/CD
# - Checks deben pasar
# - Al menos 1 approval

# 5. Merge a develop
# - Squash and merge (opcional)
# - Eliminar rama automáticamente
```


## Automatización CI/CD

### 5.1 Flujo de GitHub Actions

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│                     EVENTO: Push a main/develop                    │
│                            │                                      │
│                            ▼                                      │
│                 ┌─────────────────────┐                          │
│                 │   GitHub Actions    │                          │
│                 │   Trigger Workflow  │                          │
│                 └──────────┬──────────┘                          │
│                            │                                      │
│              ┌────────────┴────────────┐                        │
│              ▼                           ▼                        │
│    ┌──────────────────┐     ┌──────────────────┐               │
│    │   JOB: CI        │     │ JOB: DEPLOY      │               │
│    │                  │     │ (Solo en main)    │               │
│    │ - Checkout       │     │                  │               │
│    │ - Setup Node    │     │ - Checkout        │               │
│    │ - npm ci        │────▶│ - Setup Node      │               │
│    │ - npm run build │     │ - npm ci          │               │
│    │                  │     │ - npm run build   │               │
│    │                  │     │                  │               │
│    │                  │     │ - Netlify Deploy  │               │
│    │                  │     │                  │               │
│    └────────┬─────────┘     └────────┬─────────┘               │
│             │                        │                          │
│             │ All checks pass         │ Success                  │
│             │                        │                          │
│             ▼                        ▼                          │
│    ┌──────────────────┐     ┌──────────────────┐               │
│    │   ✓ CI Passed    │     │  ✓ Deployed to  │               │
│    │                  │     │    Netlify      │               │
│    └──────────────────┘     └──────────────────┘               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 5.2 Roles de la Automatización en CI/CD

#### **Continuous Integration (CI):**

| Etapa | Herramienta | Función | Beneficio |
|-------|-------------|---------|-----------|
| **Checkout** | `actions/checkout@v4` | Descarga código | Acceso al repositorio |
| **Node Setup** | `actions/setup-node@v4` | Configura Node 20 | Ambiente de ejecución |
| **Dependencies** | `npm ci` | Instala paquetes | Consistencia entre ambientes |
| **Build** | `npm run build` + `tsc` | Compila TypeScript | Detecta errores de tipo |
| **Tests** | `npm test` (si existe) | Ejecuta tests | Valida funcionalidad |

#### **Continuous Deployment (CD):**

| Etapa | Herramienta | Función | Beneficio |
|-------|-------------|---------|-----------|
| **Build Artifact** | Vite | Genera `/dist` | Código optimizado |
| **Deploy** | `actions-netlify@v3` | Sube a Netlify | Despliegue automático |
| **Preview** | Netlify | Genera URL preview | Visualización de PRs |

### 5.3 Beneficios de la Automatización:

✅ **Detección Temprana de Errores**
- TypeScript errors se detectan en CI antes de producción
- Build failures impiden deploy

✅ **Consistencia**
- Mismo proceso en cada commit
- Elimina errores humanos

✅ **Velocidad**
- Deploy en ~2-3 minutos
- Preview de PRs en automático

✅ **Retroalimentación Inmediata**
- Status checks en GitHub
- Notificaciones de éxito/fallo

### 5.4 Configuración de Secrets (Requerido)

Para que el pipeline funcione, configurar en GitHub:

**Settings → Secrets and variables → Actions:**

```bash
NETLIFY_AUTH_TOKEN=xxxxx_generado_en_netlify
NETLIFY_SITE_ID=xxxxx_id_del_sitio
```

---

### 7.1 Herramientas de Inteligencia Artificial Utilizadas

| Herramienta | Tipo | Versión | Propósito | Aplicación |
|-------------|------|---------|-----------|------------|
| **GitHub Copilot** | AI Pair Programming | [versión] | Autocompletado de código | Sugerencias de código en VS Code |
| **Gemini (Google)** | AI Assistant | Latest | Generación de documentación | Creación de README, documentación técnica |
| **Open Code (Opencode.ai)** | AI Agent | Latest | Asistencia en ingeniería | Análisis de código, sugerencias de arquitectura, debugging |


### 7.3 Principios Éticos Aplicados:

1. **Transparencia:** Todas las herramientas están declaradas en este documento
2. **Ownership:** El código funcional fue desarrollado y revisado por humanos
3. **Aprendizaje:** Las herramientas de IA se usaron como asistencia, no como reemplazo
4. **Validación:** Todo código sugerido fue revisado y aprobado por el equipo

---

## Reflexiones Individuales

### Victor Barrera

#### Rol en el Proyecto:
Desarrollador Principal / DevOps Engineer

#### Responsabilidades:
- Arquitectura del frontend con React y TypeScript
- Configuración de pipeline CI/CD
- Despliegue y mantenimiento en Netlify
- Implementación de features y hotfixes

#### Reflexión Personal:

Para mí, este proyecto fue la oportunidad perfecta para aplicar un estándar profesional a un flujo real. Lo que más rescato es haber configurado un pipeline de CI/CD que realmente cuida el código: el uso de artefactos y la separación de ambientes (Preview y Prod) asegura que nada se rompa en el camino.

La IA fue clave como mi 'copiloto' para acelerar la documentación y auditar los archivos YAML, permitiéndome enfocarme en la arquitectura. El mayor desafío fue mantener la disciplina con GitFlow y la sincronización entre ramas, pero lo resolvimos con automatización. Me voy con la seguridad de que este nivel de trazabilidad y automatización es el que quiero replicar en cada proyecto, ya que me prepara para entregar software con calidad de nivel.

**
---

### Eliezer Carrasco

#### Rol en el Proyecto:
Desarrollador Frontend / QA Engineer

#### Responsabilidades:
- Desarrollo de componentes UI
- Implementación de features
- Testing y validación de funcionalidades
- Documentación de procesos

#### Reflexión Personal:


---

## Requisitos e Instalación

### 8.1 Requisitos Previos

```
- Node.js 20.x o superior
- npm 10.x o superior
- Git 2.x o superior
- Editor de código (VS Code recomendado)
- Cuenta en GitHub
- Cuenta en Netlify (para deploys)
```

### 8.2 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/victor99a/Demo-Barber.git
cd Demo-Barber

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar build de producción
npm run build

# Previsualizar build
npm run preview
```

### 8.3 Comandos Disponibles

| Comando | Descripción | Uso |
|---------|-------------|-----|
| `npm run dev` | Inicia servidor de desarrollo | Desarrollo local |
| `npm run build` | Build de producción (incluye tsc) | Pre-deploy |
| `npm run preview` | Previsualiza build local | Testing |
| `npm run test` | Ejecuta tests unitarios (Vitest) | Validación |
| `npm run lint` | Linting de código | Code quality |
| `tsc` | Type checking | Validación de tipos |

### 8.4 Testing

Este proyecto utiliza **Vitest** para testing unitario con **React Testing Library**.

```bash
# Ejecutar tests una vez
npm test

# Ejecutar tests en modo watch (desarrollo)
npm run test:watch
```


## Contribución y Licencia

### 9.1 Guía de Contribución

¡Agradecemos las contribuciones! Por favor seguir estos pasos:

```bash
# 1. Fork del repositorio

# 2. Crear rama feature
git checkout -b feature/mi-nueva-funcionalidad

# 3. Hacer commits (seguir Conventional Commits)
git commit -m "feat(scope): descripción clara"

# 4. Push a tu fork
git push origin feature/mi-nueva-funcionalidad

# 5. Crear Pull Request en GitHub
```

### 9.2 Estándares de Código

- **TypeScript:** Modo estricto habilitado
- **Linting:** ESLint (si está configurado)
- **Formatting:** Prettier (si está configurado)
- **Commits:** Conventional Commits
- **Testing:** Jest/Vitest (si está configurado)

### 9.3 Licencia

Este proyecto está bajo la licencia **MIT License**.

```
MIT License

Copyright (c) 2024 Demo Barber Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### 9.4 Información de Contacto

| Miembro | GitHub | Rol |
|---------|--------|-----|
| Victor Barrera | [@victor99a](https://github.com/victor99a) | DevOps / Lead Developer |
| Eliezer Carrasco | [@eliezercarrasco](https://github.com/eliezercarrasco) | Frontend Developer |

---

## Apéndices

### A. Glosario de Términos

| Término | Definición |
|---------|------------|
| **CI/CD** | Continuous Integration / Continuous Deployment |
| **GitFlow** | Estrategia de ramificación con main, develop, features, releases y hotfixes |
| **Trunk-based** | Estrategia con una sola rama principal |
| **Conventional Commits** | Estándar de mensajes de commit |
| **Hotfix** | Corrección urgente de bug en producción |
| **Feature Branch** | Rama para desarrollar nueva funcionalidad |
| **Code Review** | Revisión de código por pares |
| **Pipeline** | Flujo automatizado de CI/CD |
| **Deploy** | Despliegue a producción |
| **Preview** | Previsualización de cambios |

