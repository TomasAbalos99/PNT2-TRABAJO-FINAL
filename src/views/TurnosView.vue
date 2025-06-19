<template>
  <div class="turnos-container">
    <h2>Gestión de Turnos</h2>
    <p>Bienvenido, tu rol es: <strong>{{ userStore.rol }}</strong></p>

    <div v-if="cargando">Cargando turnos...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="turnos.length === 0">
      <p>No tenés turnos registrados.</p>
    </div>
    <ul v-else>
      <li v-for="turno in turnos" :key="turno.id">
        📅 {{ new Date(turno.fecha).toLocaleString() }} — {{ turno.motivo }} ({{ turno.estado }})
      </li>
    </ul>

    <div v-if="userStore.rol === 'medico'">
      
    </div>

    <div v-else-if="userStore.rol === 'paciente'">
      <h3>Mis turnos</h3>
      <button @click="mostrarFormulario = true">Solicitar nuevo turno</button>

      <div v-if="mostrarFormulario" class="form-turno">
        <h4>Nuevo turno</h4>

        <label>Médico</label>
        <select v-model="medicoId">
          <option disabled value="">Seleccioná un médico</option>
          <option v-for="medico in medicos" :key="medico.auth_id" :value="medico.auth_id">
            {{ medico.nombre }}
          </option>
        </select>

        <label>Fecha y hora</label>
        <input type="datetime-local" v-model="fecha" />

        <label>Motivo</label>
        <input type="text" v-model="motivo" />

        <button @click="crearTurno">Confirmar turno</button>
        <button @click="mostrarFormulario = false">Cancelar</button>

        <p v-if="errorCrear" class="error">{{ errorCrear }}</p>
      </div>
    </div>

    <div v-else>
      <p>No tenés permisos para ver esta sección.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '../stores/user.js'
import { turnosService } from '../services/turnos.services.js'
import { usuariosService } from '../services/usuarios.services.js'

const userStore = useUserStore()

// Turnos
const turnos = ref([])
const cargando = ref(true)
const error = ref(null)

// Formulario de nuevo turno
const mostrarFormulario = ref(false)
const medicoId = ref('')
const fecha = ref('')
const motivo = ref('')
const medicos = ref([])
const errorCrear = ref('')

// Cargar turnos al montar
onMounted(async () => {
  cargando.value = true
  try {
    turnos.value = await turnosService.getTurnosPorUsuario(
      userStore.id,
      userStore.rol
    )
  } catch (err) {
    error.value = err.message
  } finally {
    cargando.value = false
  }
})

// Cargar médicos
const cargarMedicos = async () => {
  try {
    medicos.value = await usuariosService.obtenerMedicos()
  } catch (err) {
    errorCrear.value = err.message
  }
}

// Crear nuevo turno
const crearTurno = async () => {
  if (!fecha.value || !motivo.value || !medicoId.value) {
    errorCrear.value = 'Completá todos los campos.'
    return
  }

  try {
    await turnosService.crearTurno({
      fecha: fecha.value,
      motivo: motivo.value,
      paciente_id: userStore.id,
      medico_id: medicoId.value
    })

    // Reset
    mostrarFormulario.value = false
    medicoId.value = ''
    fecha.value = ''
    motivo.value = ''
    errorCrear.value = ''

    // Refrescar turnos
    turnos.value = await turnosService.getTurnosPorUsuario(
      userStore.id,
      userStore.rol
    )
  } catch (err) {
    errorCrear.value = err.message
  }
}

// Cuando se abre el formulario, cargar médicos
watch(mostrarFormulario, (mostrar) => {
  if (mostrar && medicos.value.length === 0) {
    cargarMedicos()
  }
})
</script>

<style scoped>
.turnos-container {
  text-align: center;
  margin-top: 40px;
}

button {
  margin: 5px;
  padding: 10px 20px;
}

.form-turno {
  margin-top: 20px;
}

.form-turno input,
.form-turno select {
  display: block;
  margin: 10px auto;
  padding: 8px;
  width: 250px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
