<template>
  <div class="chart-container">
    <h3 class="text-center">Pacientes por médico</h3>
    <canvas ref="chartCanvas" height="200"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  datos: {
    type: Array,
    required: true
  }
})

const chartCanvas = ref(null)
let chart = null

onMounted(() => {
  watchEffect(() => {
    if (!props.datos.length || !chartCanvas.value) return

    const labels = props.datos.map(d => d.nombre)
    const values = props.datos.map(d => d.count)

    if (chart) chart.destroy()

    chart = new Chart(chartCanvas.value, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: [
            '#0d6efd', '#ffc107', '#dc3545', '#198754', '#6f42c1'
          ]
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  })
})
</script>

<style scoped>
.chart-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>

