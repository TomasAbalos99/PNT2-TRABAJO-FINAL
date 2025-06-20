<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/">Inicio</router-link>
      <router-link to="/turnos">Turnos</router-link>
      <router-link v-if="userStore.rol === 'medico'" to="/pacientes">Pacientes</router-link>
      <router-link v-if="userStore.rol === 'admin'" to="/reportes">Reportes</router-link>
    </div>

    <div class="nav-right">
  <span v-if="userStore.email">Hola, {{ userStore.email }}</span>
  
  <button v-if="userStore.email" @click="logout">Cerrar sesión</button>
  
  <router-link v-else to="/login">
    <button>Iniciar sesión</button>
  </router-link>
</div>
  </nav>
</template>

<script setup>
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

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
