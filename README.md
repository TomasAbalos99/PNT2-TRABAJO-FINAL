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
- CRUD de turnos 
- Visualización de turnos para medicos y pacientes; solo éstos ultimos pueden solicitad un turno.
- Visualizacion de usuarios, desde sesion del administrador, pudiendo desactivar o activar cualquier cuenta.
- Visualizacion de reportes (para admins), con al menos 2 graficos integrados calculando estadisticas (PacientexMedico-TurnosxEstado).
- Visualizacion del perfil del usuario, con la posibilidad de editar campos nombre, telefono y direccion
---

## 🛠 Estructura del proyecto

```bash
src/
├── components/ # Navbar, Footer, Carousel,Grafico de turnos
├── views/ # LoginView, RegisterView, TurnosView, etc.
├── router/ # Configuración de rutas y guards
├── services/ # authService.js, usuariosServices.js,turnosServices.js
├── stores/ # userStore con Pinia
└── supabaseClient/ # configuración de conexión
```


---

##  Para correr el proyecto

 Instalar dependencias:

```bash
npm install
```
Correr en desarrollo:

```bash
npm run dev
```

## DEPLOY

Deploy en Render, link:
```bash
 https://pnt2-trabajo-final.onrender.com/
