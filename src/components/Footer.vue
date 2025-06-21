<template>
  <footer class="footer bg-light text-center text-muted py-3 mt-auto shadow-sm">
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
