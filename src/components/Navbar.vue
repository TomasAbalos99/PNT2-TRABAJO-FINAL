<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Clinica Salud</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Inicio</RouterLink>
          </li>
          <li class="nav-item" v-if="userStore.rol === 'paciente' || userStore.rol === 'medico'">
            <RouterLink class="nav-link" to="/turnos">Turnos</RouterLink>
          </li>
          <li class="nav-item" v-if="estaLogeado">
              <RouterLink class="nav-link" to="/perfil">Perfil</RouterLink>
          </li>
          <li class="nav-item" v-if="userStore.rol === 'admin'">
            <RouterLink class="nav-link" to="/reportes">Reportes</RouterLink>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item" v-if="estaLogeado">
            <button class="btn btn-outline-light" s @click="logout">Cerrar sesión</button> 
          </li>
          <li class="nav-item" v-else>
            <RouterLink class="btn btn-light" to="/login">Iniciar sesión</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'


const userStore = useUserStore()
const router = useRouter()
const estaLogeado = computed(() => userStore.estaLogeado)

const logout = () => {
  userStore.clearUserData()
  router.push('/')
}
</script>


<style scoped>
.navbar {
  background-color: #f8f9fa;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.nav-left a {
  margin-right: 16px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

button {
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
}
</style>
