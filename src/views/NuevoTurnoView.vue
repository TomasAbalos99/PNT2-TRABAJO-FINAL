<template>
  <div class="container my-5">
    <div class="card mx-auto shadow-sm p-4" style="max-width: 600px;">
      <h2 class="text-center mb-4">📝 Solicitar nuevo turno</h2>

      <div v-if="errorCrear" class="alert alert-danger text-center">
        {{ errorCrear }}
      </div>

      <form @submit.prevent="crearTurno">
                <!-- Select de especialidad -->
        <div class="mb-3">
          <label class="form-label">🏥 Especialidad</label>
          <select class="form-select" v-model="especialidadSeleccionada" required>
            <option disabled value="">Seleccioná una especialidad</option>
            <option v-for="esp in especialidades" :key="esp" :value="esp">
              {{ esp }}
            </option>
          </select>
        </div>

        <!-- Select de medico (filtrados segun especialidad) -->
        <div class="mb-3">
          <label class="form-label">👨‍⚕️ Médico</label>
          <select class="form-select" v-model="medicoId" :disabled="medicosFiltrados.length === 0" required>
            <option disabled value="">Seleccioná un médico</option>
            <option v-for="medico in medicosFiltrados" :key="medico.auth_id" :value="medico.auth_id">
              {{ medico.nombre }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">📅 Fecha y hora</label>
          <input class="form-control" type="datetime-local" v-model="fecha" required />
        </div>

        <div class="mb-3">
          <label class="form-label">📝 Motivo</label>
          <input class="form-control" type="text" v-model="motivo" placeholder="Ej: Dolor de cabeza" required />
        </div>
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" v-model="esUrgencia" id="urgenciaCheck">
          <label class="form-check-label" for="urgenciaCheck">
       ¿Es una urgencia?
          </label>
        </div>

        <div class="mb-3" v-if="esUrgencia">
          <label class="form-label">✏️ Describí la urgencia</label>
          <textarea class="form-control" v-model="descripcionUrgencia" rows="3"></textarea>
        </div>

        <div class="d-flex justify-content-between">
          <router-link to="/turnos" class="btn btn-outline-secondary">Cancelar</router-link>
          <button class="btn btn-primary" type="submit">Confirmar turno</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { turnosService } from '../services/turnos.services.js'
import { usuariosService } from '../services/usuarios.services.js'

const userStore = useUserStore()
const router = useRouter()

const medicoId = ref('')
const fecha = ref('')
const motivo = ref('')
const medicos = ref([])
const errorCrear = ref('')
const esUrgencia = ref(false)
const descripcionUrgencia = ref('')
const especialidades = ['clinica', 'pediatria','gastrologia','neurologia','kinesiologia', 'cardiologia', 'dermatologia']
const especialidadSeleccionada = ref('')

onMounted(async () => {
  try {
    medicos.value = await usuariosService.obtenerMedicos()
  } catch (err) {
    errorCrear.value = 'Error al cargar los médicos'
  }
})

const medicosFiltrados = computed(() => {
  if (!especialidadSeleccionada.value) return []

  return medicos.value.filter(
    (m) =>
      m.especialidad &&
      normalizar(m.especialidad) === normalizar(especialidadSeleccionada.value)
  )
})

const crearTurno = async () => {
  if (!fecha.value || !motivo.value || !medicoId.value) {
    errorCrear.value = 'Completá todos los campos.'
    return
  }
  if (esUrgencia.value && !descripcionUrgencia.value.trim()) {
    errorCrear.value = 'Describí la urgencia.'
    return
}

  try {
    await turnosService.crearTurno({
      fecha: fecha.value,
      motivo: motivo.value,
      paciente_id: userStore.id,
      medico_id: medicoId.value,
      urgencia: esUrgencia.value,
      descripcion_urgencia: descripcionUrgencia.value || null
    })

    router.push('/turnos')
  } catch (err) {
    errorCrear.value = err.message
  }
}

const normalizar = (texto) =>
  texto?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()

</script>

<style scoped>
.nuevo-turno-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.error {
  color: red;
  margin-bottom: 10px;
}
</style>
