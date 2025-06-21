<template>
  <div class="container mt-5">
    <h2>📊 Reportes</h2>
    <TurnosPorEstadoChart v-if="!cargando && datosPorEstado.length" :datos="datosPorEstado" />
    <p v-else>Cargando datos...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { supabase } from '../supabaseClient/supabaseClient'
import TurnosPorEstadoChart from '../components/TurnosPorEstadoChart.vue'


const datosPorEstado = ref([])
const cargando = ref(true)

onMounted(async () => {
  cargando.value = true

  const { data, error } = await supabase
    .from('turnos')
    .select('estado')

  if (!error && data) {
    const agrupados = data.reduce((acc, turno) => {
      acc[turno.estado] = (acc[turno.estado] || 0) + 1
      return acc
    }, {})

    datosPorEstado.value = Object.entries(agrupados).map(([estado, count]) => ({
      estado,
      count
    }))
  } else {
    console.error('Error al obtener datos:', error)
  }

  cargando.value = false
})

</script>