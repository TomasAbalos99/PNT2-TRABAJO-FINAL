<template>
  <div class="register-container">
    <h2>Registro de Usuario</h2>

    <input v-model="nombre" placeholder="Nombre completo" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Contraseña" />

    <select v-model="rol">
      <option disabled value="">Seleccioná un rol</option>
      <option value="paciente">Paciente</option>
      <option value="medico">Médico</option>
    </select>

    <div v-if="rol === 'medico'">
      <input v-model="especialidad" placeholder="Especialidad" />
      <input v-model="matricula" placeholder="Matrícula" />
    </div>

    <button @click="registrarse">Registrarse</button>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabaseClient/supabaseClient.js'

const nombre = ref('')
const email = ref('')
const password = ref('')
const rol = ref('')
const especialidad = ref('')
const matricula = ref('')
const error = ref('')
const router = useRouter()

const registrarse = async () => {
  error.value = ''

  if (!email.value || !password.value || !nombre.value || !rol.value) {
    error.value = 'Completá todos los campos obligatorios'
    return
  }

  const { data, error: signupError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        rol: rol.value
      }
    }
  })

  if (signupError) {
    error.value = signupError.message
    return
  }

  const userId = data.user.id

  
  if (rol.value === 'paciente') {
    await supabase.from('pacientes').insert([
      {
        auth_id: userId,
        nombre: nombre.value
      }
    ])
  } else if (rol.value === 'medico') {
    if (!especialidad.value || !matricula.value) {
      error.value = 'Faltan datos del médico'
      return
    }

    await supabase.from('medicos').insert([
      {
        auth_id: userId,
        nombre: nombre.value,
        especialidad: especialidad.value,
        matricula: matricula.value
      }
    ])
  }

  router.push('/') // Redirigir al login luego del registro
}
</script>

<style scoped>
.register-container {
  text-align: center;
  margin-top: 50px;
}

input, select {
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
</style>
