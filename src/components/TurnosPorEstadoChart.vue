<template>
  <div class="chart-container">
    <h3 class="text-center">Turnos por estado</h3>
    <canvas ref="barChart" height="200"></canvas>
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

const barChart = ref(null)
let chart = null

onMounted(() => {
  watchEffect(() => {
    if (!props.datos.length || !barChart.value) return

    const labels = props.datos.map(d => d.estado)
    const values = props.datos.map(d => d.count)

    if (chart) chart.destroy()

    chart = new Chart(barChart.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Cantidad de turnos',
          data: values,
          backgroundColor: '#0d6efd'
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
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
