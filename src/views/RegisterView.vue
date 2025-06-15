<template>
  <div class="register-container">
    <h2>Registro</h2>

    <input v-model="nombre" type="text" placeholder="Nombre completo" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <select v-model="rol">
      <option value="" disabled>Seleccioná tu rol</option>
      <option value="paciente">Paciente</option>
      <option value="medico">Médico</option>
    </select>

    <input
      v-if="rol === 'medico'"
      v-model="especialidad"
      type="text"
      placeholder="Especialidad"
    />
    <input
      v-if="rol === 'medico'"
      v-model="matricula"
      type="text"
      placeholder="Matrícula"
    />

    <button @click="register">Registrarse</button>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService.js'
import { useUserStore } from '../stores/user.js'

const nombre = ref('')
const email = ref('')
const password = ref('')
const rol = ref('')
const especialidad = ref('')
const matricula = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

const register = async () => {
  error.value = ''
  try {
    const userData = await authService.register(
      email.value,
      password.value,
      nombre.value,
      rol.value,
      especialidad.value,
      matricula.value
    )

    userStore.setUserData({
      id: userData.id,
      email: userData.email,
      rol: userData.rol
    })

    router.push('/turnos')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.register-container {
  text-align: center;
  margin-top: 40px;
}

input,
select {
  display: block;
  margin: 10px auto;
  padding: 8px;
  width: 240px;
}

button {
  padding: 8px 20px;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
