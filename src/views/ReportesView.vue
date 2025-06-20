<template>
  <div class="container mt-5">
    <h2>📊 Reportes</h2>
<!--<p>Bienvenido, {{ userStore.email }}</p>-->

    <TurnosPorEstadoChart :datos="datosPorEstado" v-if="datosPorEstado.length" />
    <p v-else>Cargando datos...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user.js'
import { supabase } from '../supabaseClient/supabaseClient.js'
import TurnosPorEstadoChart from '../components/TurnosPorEstadoChart.vue'

const userStore = useUserStore()
const datosPorEstado = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('turnos')
    .select('estado')

  if (!error) {
    // Agrupo manualmente por estado, supabase no reconoce el metodo group(), como se haria en un SQL tradicional
    const agrupados = data.reduce((acc, turno) => {
      acc[turno.estado] = (acc[turno.estado] || 0) + 1
      return acc
    }, {})

    // Transformo en array, como espera el componente de Chart
    datosPorEstado.value = Object.entries(agrupados).map(([estado, count]) => ({
      estado,
      count
    }));
    

  } else {
    console.error('Error al obtener datos:', error)
  }
})

</script>
