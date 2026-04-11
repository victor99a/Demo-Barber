# Guía de Contribución - Demo Barber

##欢迎来到 Demo Barber!

Gracias por tu interés en contribuir al proyecto. Esta guía te ayudará a comenzar.

## Proceso de Desarrollo

### 1. Configuración Inicial

```bash
# Clonar el repositorio
git clone https://github.com/victor99a/Demo-Barber.git
cd Demo-Barber

# Crear rama develop si no existe
git checkout -b develop
git push -u origin develop

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar desarrollo
npm run dev
```

### 2. Workflow con GitFlow

#### Flujo de Feature

```bash
# Asegurarse de estar en develop actualizado
git checkout develop
git pull origin develop

# Crear nueva rama feature
git checkout -b feature/mi-nueva-funcionalidad

# ... hacer cambios ...

# Hacer commit (importante: seguir Conventional Commits!)
git add .
git commit -m "feat(scope): descripción clara del cambio"

# Push al remote
git push -u origin feature/mi-nueva-funcionalidad

# Crear Pull Request en GitHub
# Asignar reviewers, agregar descripción
```

#### Flujo de Hotfix

```bash
# Desde main (para hotfix urgencia)
git checkout main
git pull origin main
git checkout -b hotfix/correccion-urgente

# ... hacer cambios urgentes ...

# Commit con tipo fix
git add .
git commit -m "fix(scope): descripción de la corrección"

# Push y crear PR a main Y develop
git push origin hotfix/correccion-urgente

# IMPORTANTE: Crear PR a main primero, luego a develop
```

### 3. Conventional Commits (Estándar Obligatorio)

Usamos Conventional Commits para mantener historial limpio:

```bash
# Formato
<tipo>(<alcance>): <descripción>

# Tipos permitidos
feat     - Nueva funcionalidad
fix      - Corrección de bug
docs     - Documentación
style    - Formato, estilos (CSS)
refactor - Refactorización
test     - Tests
chore    - Mantenimiento
perf     - Performance
ci       - CI/CD
```

#### Ejemplos de Commits

✅ **Correcto:**
```bash
git commit -m "feat(booking): agregar selector de fecha"
git commit -m "fix(nav): corregir menú en móviles"
git commit -m "docs(readme): actualizar instrucciones"
git commit -m "chore(deps): actualizar react a v19"
```

❌ **Incorrecto:**
```bash
git commit -m "cambios"                          # Sin tipo
git commit -m "feat: AGREGAR COSA"               # Mayúsculas
git commit -m "feat: agregué una cosa genial"    # Pasado
git commit -m "fix: fix stuff"                   # Vago
```

### 4. Pull Requests

#### Antes de Crear PR

- [ ] Tests pasan (`npm run build`)
- [ ] TypeScript compila sin errores (`tsc`)
- [ ] Código sigue guías de estilo
- [ ] Commits siguen Conventional Commits
- [ ] Documentación actualizada si es necesario

#### Template de PR

```markdown
## Descripción
[Explica qué cambia y por qué]

## Tipo de Cambio
- [ ] Feature nueva
- [ ] Bug fix
- [ ] Refactorización
- [ ] Documentación

## Testing
[Cómo probaste los cambios]

## Checklist
- [ ] Tests agregados/actualizados
- [ ] Documentación actualizada
- [ ] No hay console.logs de debug
- [ ] Responsive en móvil
- [ ] Accessibilidad verificada
```

#### Proceso de Code Review

1. **Asignar Reviewers** - Mínimo 1 persona
2. **Esperar Aprobación** - Todos los checks deben pasar
3. **Resolver Comentarios** - Dialogar si hay desacuerdos
4. **Merge** - Squash merge recomendado para features
5. **Limpiar** - Rama se elimina automáticamente

### 5. Estándares de Código

#### TypeScript

- **Strict mode** siempre habilitado
- **Evitar `any`** - Usar tipos específicos
- **Interfaces** para props de componentes
- **Funciones tipadas** con tipos de retorno

```typescript
// ✅ Correcto
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  // ...
};

// ❌ Incorrecto
const Button = (props: any) => {
  // ...
};
```

#### React Components

```typescript
// ✅ Correcto
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const MyComponent = ({ title, children }: MyComponentProps) => {
  const [state, setState] = useState<boolean>(false);
  
  const computedValue = useMemo(() => {
    return expensiveCalculation(state);
  }, [state]);
  
  return (
    <div className="p-4 bg-gray-900">
      <h2 className="text-xl">{title}</h2>
      {children}
    </div>
  );
};
```

#### CSS / Tailwind

- **Solo Tailwind** - No archivos CSS separados (excepto index.css)
- **Mobile-first** - Empezar con clases base, agregar `md:` y `lg:` después
- **Clases ordenadas** - No critical, pero mantener consistencia

```typescript
// ✅ Correcto
<div className="bg-[#171717] p-8 rounded-xl border border-white/5 
                 hover:border-[#D4AF37]/50 transition-all">
  {/* ... */}
</div>

// ❌ Incorrecto - No inline styles
<div style={{ backgroundColor: '#171717' }}>
  {/* ... */}
</div>
```

### 6. Errores Comunes a Evitar

❌ **NO HACER:**
```bash
# Commits sin mensaje
git commit -m "fix"

# Push directo a main/develop
git push origin main

# Merge sin PR ni review
git merge feature-branch

# Dejar código de debug
console.log("DEBUG:", variable)
console.log("TODO: fix later")

# Archivos sensibles en commit
# API keys, passwords, tokens
```

✅ **SÍ HACER:**
```bash
# Commits descriptivos
git commit -m "fix(auth): corregir validación de email"

# Crear PR siempre
# Usar GitFlow workflow

# Limpiar código antes de commit
# git diff para revisar cambios

# Probar en local antes de push
npm run build && npm run preview
```

### 7. Recursos de Aprendizaje

#### Git & GitFlow
- [Git Flow Cheat Sheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- [Conventional Commits](https://www.conventionalcommits.org/)

#### Herramientas
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## Preguntas?

Si tienes dudas:

1. **Revisa issues abiertos** - Tal vez alguien ya preguntó
2. **Crea nuevo issue** - Con标签 `question`
3. **Consulta a teammates** - Victor Barrera, Eliezer Carrasco

## Licencia

Al contribuir, aceptas que tus contribuciones estarán bajo la licencia MIT del proyecto.

---

**¡Gracias por tu contribución! 🚀**
