<template>
  <div class="turnos-container">
    <h2>Gestión de Turnos</h2>
    <p>Bienvenido! ingresaste como <strong>{{ userStore.rol }}</strong></p>

    <div v-if="cargando">Cargando turnos...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="turnos.length === 0">
      <p>No tenés turnos registrados.</p>
    </div>
    <ul v-else>
      <li v-for="turno in turnos" :key="turno.id">
        📅 {{ new Date(turno.fecha).toLocaleString() }} — {{ turno.motivo }} ({{ turno.estado }})
         <button
    v-if="userStore.rol === 'paciente' && turno.estado === 'pendiente'"
    @click="cancelarTurno(turno.id)"
  >
    Cancelar
  </button>

    <div v-if="userStore.rol === 'medico' && ['pendiente', 'confirmado'].includes(turno.estado)">

  <select
  class="form-select d-inline w-auto"
  v-model="estadosSeleccionados[turno.id]"
>
  <option disabled value="">Seleccioná estado</option>
  <option value="confirmado" v-if="turno.estado === 'pendiente'">Confirmar</option>
  <option value="completado" v-if="turno.estado === 'confirmado'">Marcar como completado</option>
  <option value="rechazado">Rechazar</option>
</select>

<button
  class="btn btn-primary btn-sm ms-2"
  @click="cambiarEstado(turno.id)"
>
  Guardar
</button>

</div>
      </li>
    </ul>

    <div v-if="userStore.rol === 'medico'">
      
    </div>

    <div v-else-if="userStore.rol === 'paciente'">
    
      <router-link to="/nuevo-turno" class="btn btn-primary">
  Solicitar turno
</router-link>

  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '../stores/user.js'
import { turnosService } from '../services/turnos.services.js'


const userStore = useUserStore()

// Turnos
const turnos = ref([])
const cargando = ref(true)
const error = ref(null)



const estadosSeleccionados = ref({}) // guarda el estado elegido por turno (para el update de turno por parte del medico)
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


const cancelarTurno = async (turnoId) => {
  try {
    await turnosService.cancelarTurno(turnoId)

    // Refrescar turnos
    turnos.value = await turnosService.getTurnosPorUsuario(
      userStore.id,
      userStore.rol
    )
  } catch (err) {
    error.value = err.message
  }
}

const cambiarEstado = async (turnoId) => {
  const nuevoEstado = estadosSeleccionados.value[turnoId]
  if (!nuevoEstado) return

  try {
    await turnosService.actualizarEstadoTurno(turnoId, nuevoEstado)

    // Refrescar lista
    turnos.value = await turnosService.getTurnosPorUsuario(userStore.id, userStore.rol)
  } catch (err) {
    error.value = err.message
  }
}

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
