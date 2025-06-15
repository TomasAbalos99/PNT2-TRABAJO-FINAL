<template>
  <div class="turnos-container">
    <h2>Gestión de Turnos</h2>
    <p>Bienvenido, tu rol es: <strong>{{ rol }}</strong></p>

    <div v-if="rol === 'medico'">
      <h3>Turnos asignados a vos</h3>
      <!-- mas adelante, aca los turnos traidos de supa -->
      <p>Acá se mostrará el listado completo de turnos para el médico.</p>
      <button>Editar turno</button>
      <button>Cancelar turno</button>
    </div>

    <div v-else-if="rol === 'paciente'">
      <h3>Mis turnos</h3>
      <p>Acá vas a poder ver tus turnos y pedir uno nuevo.</p>
      <button>Solicitar nuevo turno</button>
    </div>

    <div v-else>
      <p>No tenés permisos para ver esta sección.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const rol = ref('')

onMounted(() => {
  rol.value = localStorage.getItem('rol') || 'desconocido'
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
</style>
