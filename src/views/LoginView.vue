<template>
  <div class="login-container mx-auto p-4 shadow rounded" style="max-width: 400px;">
    <h2 class="text-center mb-4">Iniciar sesión</h2>

<div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input v-model="email" type="email" placeholder="ejemplo@email.com" />
</div>

<div class="mb-3">
    <label for="password" class="form-label">Contraseña</label>
    <input v-model="password" type="password" placeholder="••••••••" />
</div>

    <button class = "btn btn-dark" @click="login">Ingresar</button>

    <p v-if="error" class="error">{{ error }}</p>

    <!-- enlace al registro -->
    <router-link to="/register">¿No tenés cuenta? Registrate</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { authService } from '../services/authService.js'
import { usuariosService } from '../services/usuarios.services.js'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  error.value = ''

  try {
    const userData = await authService.login(email.value, password.value)
    userStore.setUserData(userData)

    // lo dejo por las dudas
    localStorage.setItem('usuario_id', userData.id)
    localStorage.setItem('rol', userData.rol)

    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}
</script>


<style scoped>
.login-container {
  text-align: center;
  margin-top: 50px;
}

input {
  display: block;
  margin: 10px auto;
  padding: 8px;
  width: 220px;
}

button {
  padding: 8px 20px;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}

a {
  display: block;
  margin-top: 15px;
  color: #007bff;
  text-decoration: none;
}
</style>
