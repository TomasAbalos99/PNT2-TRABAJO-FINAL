import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TurnosView from '../views/TurnosView.vue'
import PacientesView from '../views/PacientesView.vue'
import ReportesView from '../views/ReportesView.vue'
import HomeView from '../views/HomeView.vue'
import { guards } from './guards.js'
import NuevoTurnoView from '../views/NuevoTurnoView.vue'

const routes = [
  { path: '/', component: HomeView 
  },
  { path: '/login', component: LoginView, beforeEnter: guards.redirectIfAuthenticated
  },
  { path: '/register', component: RegisterView
  },
  { path: '/turnos', component: TurnosView, beforeEnter: guards.requireRole(['paciente', 'medico'])
  },
  { path: '/pacientes', component: PacientesView, beforeEnter: guards.requireRole(['medico'])
  },
  { path: '/reportes', component: ReportesView, beforeEnter: guards.requireRole(['admin'])
  },
  {
    path: '/nuevo-turno', component: NuevoTurnoView, beforeEnter: guards.requireRole(['paciente'])
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
