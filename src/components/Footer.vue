<template>
  <footer class="footer bg-dark text-white text-center py-3 mt-auto">
    <div class="container">
      <small>© {{ year }} Turnos Médicos - Todos los derechos reservados</small>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid #dee2e6;
}
</style>
