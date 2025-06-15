import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TurnosView from '../views/TurnosView.vue'
import PacientesView from '../views/PacientesView.vue'
import ReportesView from '../views/ReportesView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  { path: '/', name: 'login', component: LoginView },
  { path: '/turnos', name: 'turnos', component: TurnosView },
  { path: '/pacientes', name: 'pacientes', component: PacientesView },
  { path: '/reportes', name: 'reportes', component: ReportesView },
  { path: '/registro', name: 'Registro', component: RegisterView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
