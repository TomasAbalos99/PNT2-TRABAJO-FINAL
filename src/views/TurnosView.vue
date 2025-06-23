<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Gestión de Turnos</h2>
    <p class="text-center">Bienvenido! Ingresaste como <strong>{{ userStore.rol }}</strong></p>

    <div v-if="cargando" class="text-center text-muted">Cargando turnos...</div>
    <div v-else-if="error" class="alert alert-danger text-center">{{ error }}</div>
    <div v-else-if="turnos.length === 0" class="text-center">
      <p>No tenés turnos registrados.</p>
    </div>
    
    
    <div v-else>
        <!-- Filtros solo visibles para médicos -->
  <div v-if="userStore.rol === 'medico'" class="mb-4 d-flex justify-content-center gap-2 flex-wrap">
    <button
      v-for="estado in estados"
      :key="estado"
      class="btn"
      :class="estadoActivo === estado ? 'btn-secondary' : 'btn-outline-secondary'"
      @click="estadoActivo = estado"
    >
      {{ estado }}
    </button>
  </div>

      <div v-for="turno in turnosFiltrados" :key="turno.id" class="card mb-3 shadow-sm">



        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title mb-1">{{ userStore.rol === 'paciente'
    ? nombresMedicos[turno.medico_id]
    : nombresPacientes[turno.paciente_id] }}<!-- Depende el rol del que consulte, ve como titulo de las cards 
    sel nombre del paciente (si es medico) o el del medico (si es paciente) -->
</h5>
            <p class="mb-0">
              <span class="text-muted small">Estado:</span>
              <span class="badge ms-2" :class="badgeClass(turno.estado)">{{ turno.estado }}</span>
            </p>
          </div>

          <div class="d-flex align-items-center gap-2">
            <!-- Boton Ver Detalle de los offcanva -->
            <button
              class="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
              data-bs-toggle="offcanvas"
              :data-bs-target="'#offcanvasTurno' + turno.id"
            >
              <i class="bi bi-info-circle"></i>
              Ver detalle
            </button>

            <!-- Acciones paciente -->
            <div v-if="userStore.rol === 'paciente' && turno.estado === 'pendiente'">
              <button class="btn btn-outline-danger btn-sm" @click="cancelarTurno(turno.id)">Cancelar</button>
            </div>

            <!-- Acciones medico -->
            <div v-if="userStore.rol === 'medico' && ['pendiente', 'confirmado'].includes(turno.estado)" class="d-flex align-items-center">
              <select class="form-select form-select-sm me-2 w-auto" v-model="estadosSeleccionados[turno.id]">
                <option disabled value="">Seleccioná estado</option>
                <option value="confirmado" v-if="turno.estado === 'pendiente'">Confirmar</option>
                <option value="completado" v-if="turno.estado === 'confirmado'">Marcar como completado</option>
                <option value="rechazado">Rechazar</option>
              </select>

              <button class="btn btn-sm btn-primary" @click="cambiarEstado(turno.id)">Guardar</button>
            </div>
          </div>
        </div>

        <!-- Offcanvas -->
        <div
          class="offcanvas offcanvas-end"
          :id="'offcanvasTurno' + turno.id"
          tabindex="-1"
          :aria-labelledby="'offcanvasLabel' + turno.id"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" :id="'offcanvasLabel' + turno.id">Detalle del Turno</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <p><strong>Motivo:</strong> {{ turno.motivo }}</p>
            <p><strong>Fecha:</strong> {{ new Date(turno.fecha).toLocaleString() }}</p>
            <p><strong>Estado:</strong> {{ turno.estado }}</p>
            <div v-if="userStore.rol === 'paciente'">
            <p><strong>Profesional:</strong> {{ nombresMedicos[turno.medico_id] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Boton para pacientes -->
    <div v-if="userStore.rol === 'paciente'" class="text-center mt-4">
      <p>¿Necesitas un turno? ¡Solicitalo acá!</p>
      <router-link to="/nuevo-turno" class="btn btn-success">Solicitar turno</router-link>
    </div>
  </div>
</template>





<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '../stores/user.js'
import { turnosService } from '../services/turnos.services.js'
import { usuariosService } from '../services/usuarios.services.js'


const userStore = useUserStore()
const turnos = ref([])
const cargando = ref(true)
const error = ref(null)
const estadosSeleccionados = ref({}) 
const nombresMedicos = ref({})
const nombresPacientes = ref({})
const estados = ['pendiente', 'confirmado', 'completado', 'rechazado', 'cancelado']
const estadoActivo = ref('pendiente')


const cargarTurnos = async () => {
  if (!userStore.id || !userStore.rol) return
  cargando.value = true
  try {
    turnos.value = await turnosService.getTurnosPorUsuario(
      userStore.id,
      userStore.rol
    )
    await Promise.all(
      turnos.value.map(async (turno) => {
        if (userStore.rol === 'paciente') {
          await cargarNombreMedico(turno.medico_id)
        } else if (userStore.rol === 'medico') {
          await cargarNombrePaciente(turno.paciente_id)
        }
      })
    )

  } catch (err) {
    error.value = err.message
  } finally {
    cargando.value = false
  }
};

watch(
  () => [userStore.id, userStore.rol],
  ([nuevoId, nuevoRol]) => {
    if (nuevoId && nuevoRol) {
      cargarTurnos()
    }
  },
  { immediate: true }
)



const cancelarTurno = async (turnoId) => {
  try {
    await turnosService.cancelarTurno(turnoId);
    await cargarTurnos();

  } catch (err) {
    error.value = err.message
  }
}

const cambiarEstado = async (turnoId) => {
  const nuevoEstado = estadosSeleccionados.value[turnoId]
  if (!nuevoEstado) return

  try {
    await turnosService.actualizarEstadoTurno(turnoId, nuevoEstado)
    await cargarTurnos();
  } catch (err) {
    error.value = err.message
  }
}
const badgeClass = (estado) => {
  switch (estado) {
    case 'pendiente':
      return 'bg-warning text-dark'
    case 'confirmado':
      return 'bg-primary'
    case 'completado':
      return 'bg-success'
    case 'rechazado':
    case 'cancelado':
      return 'bg-danger'
    default:
      return 'bg-secondary'
  }
}
const cargarNombreMedico = async (id) => {
  if (!nombresMedicos.value[id]) {
    const usuario = await usuariosService.obtenerUsuarioPorId(id)
    if (usuario.rol === 'medico' )  nombresMedicos.value[id] = usuario.nombre;
  }
}

const cargarNombrePaciente = async (id) => {
  if (!nombresPacientes.value[id]) {
    const usuario = await usuariosService.obtenerUsuarioPorId(id)
    if (usuario.rol === 'paciente') nombresPacientes.value[id] = usuario.nombre;
  }
}

const turnosFiltrados = computed(() => {
  if (userStore.rol === 'medico') {
    return turnos.value.filter(t => t.estado === estadoActivo.value)
  }
  return turnos.value
})

const etiquetasEstados = {
  pendiente: 'Pendientes',
  confirmado: 'Confirmados',
  completado: 'Completados',
  rechazado: 'Rechazados',
  cancelado: 'Cancelados'
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
