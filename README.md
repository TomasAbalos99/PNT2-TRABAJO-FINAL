# 🩺 Gestión de Turnos Médicos

Aplicación web desarrollada como trabajo práctico para la materia **Programación en Nuevas Tecnologías 2**. Permite gestionar turnos médicos con autenticación de usuarios por rol.

---

## 🚀 Tecnologías utilizadas

- **Vue 3** (Composition API)
- **Vite** (build tool)
- **Pinia** (manejo de estado)
- **Vue Router**
- **Bootstrap** (estilos rápidos)
- **Supabase**
  - Autenticación (Auth)
  - Base de datos (PostgreSQL)
  - API REST automática

---

## 👥 Roles disponibles

- `paciente`: puede ver sus turnos y solicitar uno nuevo
- `medico`: puede ver los turnos asignados, editarlos o cancelarlos
- `admin`: acceso a reportes (opcional)

---

## 🧠 Funcionalidades principales

- Registro y login con validación por rol
- Sesión persistente con recuperación automática desde Supabase
- Middleware de protección de rutas (`guards.js`)
- Navbar dinámico según sesión y rol
- CRUD de turnos (en desarrollo)
- Visualización de pacientes y reportes (por rol)

---

## 🛠 Estructura del proyecto

src/
├── components/ # Navbar, Footer
├── views/ # LoginView, RegisterView, TurnosView, etc.
├── router/ # Configuración de rutas y guards
├── services/ # authService.js
├── stores/ # userStore con Pinia
└── supabaseClient/ # configuración de conexión



---

## ▶ Para correr el proyecto

 Instalar dependencias:

```bash
npm install
```
Correr en desarrollo:
```bash
npm run dev