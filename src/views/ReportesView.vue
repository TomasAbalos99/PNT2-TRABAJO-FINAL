<template>
  <div class="container mt-5">
    <h2>📊 Reportes</h2>

    <div class="mb-3">
      <p class="lead">Seleccioná el tipo de reporte que queres visualizar:</p>
      <select class="form-select" v-model="reporteSeleccionado">
        <option disabled value="">-- Elegi un reporte --</option>
        <option v-for="opcion in opciones" :key="opcion.id" :value="opcion.id">
          {{ opcion.label }}
        </option>
      </select>
    </div>

    <div v-if="reporteSeleccionado === ''" class="text-center mt-4">
      <p class="text-muted">No se ha seleccionado ningun reporte aun.</p>
    </div>

    <div v-else-if="cargando" class="text-center mt-4">
      <p>Cargando datos...</p>
    </div>

    <component
      :is="componenteActivo"
      v-else
      :datos="datosActuales"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { supabase } from '../supabaseClient/supabaseClient'
import TurnosPorEstadoChart from '../components/TurnosPorEstadoChart.vue'
import PacientesPorMedicoChart from '../components/PacientesPorMedicoChart.vue'

const reporteSeleccionado = ref('turnos') // por defecto, el primero
const cargando = ref('')

const datosPorEstado = ref([])
const datosPorMedico = ref([])


const opciones = [
  { id: 'turnos', label: 'Turnos por estado' },
  { id: 'pacientes', label: 'Pacientes por médico' }
]


const componenteActivo = computed(() =>
  reporteSeleccionado.value === 'turnos'
    ? TurnosPorEstadoChart
    : PacientesPorMedicoChart
)


const datosActuales = computed(() =>
  reporteSeleccionado.value === 'turnos'
    ? datosPorEstado.value
    : datosPorMedico.value
)


watch(reporteSeleccionado, async (nuevoReporte) => {
  cargando.value = true

  if (nuevoReporte === 'turnos') {
    const { data, error } = await supabase.from('turnos').select('estado')
    if (!error && data) {
      const agrupados = data.reduce((acc, turno) => {
        acc[turno.estado] = (acc[turno.estado] || 0) + 1
        return acc
      }, {})
      datosPorEstado.value = Object.entries(agrupados).map(([estado, count]) => ({ estado, count }))
    }
  } else if (nuevoReporte === 'pacientes') {
    const { data, error } = await supabase
      .from('turnos')
      .select('medico_id')

    if (!error && data) {
      const conteo = data.reduce((acc, turno) => {
        acc[turno.medico_id] = (acc[turno.medico_id] || 0) + 1
        return acc
      }, {})

      const nombres = {}
      for (const id of Object.keys(conteo)) {
        const { data: medicoData } = await supabase
          .from('usuarios')
          .select('nombre')
          .eq('auth_id', id)
          .single()
        nombres[id] = medicoData?.nombre || 'Desconocido'
      }

      datosPorMedico.value = Object.entries(conteo).map(([id, count]) => ({ nombre: nombres[id], count }))
    }
  }

  cargando.value = false
}, { immediate: true }) // importante para que se dispare tambien al montar


</script>