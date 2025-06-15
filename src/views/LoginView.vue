<template>
  <div class="login-container">
    <h2>Iniciar sesión</h2>

    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Contraseña" />

    <button @click="login">Ingresar</button>

    <p v-if="error" class="error">{{ error }}</p>

    <!-- enlace al registro -->
    <router-link to="/registro">¿No tenés cuenta? Registrate</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabaseClient/supabaseClient.js'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  error.value = ''

  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (authError) {
    error.value = 'Email o contraseña incorrectos'
    return
  }

  const { data: { user } } = await supabase.auth.getUser()

  const rol = user?.user_metadata?.rol || 'paciente' // por defecto, paciente

  localStorage.setItem('usuario_id', user.id)
  localStorage.setItem('rol', rol)

  router.push('/turnos')
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
