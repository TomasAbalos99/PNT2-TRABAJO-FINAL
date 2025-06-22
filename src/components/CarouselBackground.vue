<template>
  <div class="carousel-container position-relative">
    <!-- Carrusel -->
    <div id="carouselHome" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/img/medico1.png" class="carousel-img" alt="Imagen 1" />
        </div>
        <div class="carousel-item">
          <img src="/img/medico2.png" class="carousel-img" alt="Imagen 2" />
        </div>
        <div class="carousel-item">
          <img src="/img/medico3.png" class="carousel-img" alt="Imagen 3" />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselHome" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselHome" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>

    <!-- Ajusto saludo y boton dinamicos -->
    <div class="overlay-box text-white bg-dark bg-opacity-75 p-3 rounded">
      <h5 class="mb-2">Hola, {{ rolLabel }}</h5>

      <template v-if="userStore.rol">
        <router-link :to="botonRuta" class="btn btn-light btn-sm">{{ botonTexto }}</router-link>
      </template>

      <template v-else>
        <p class="mb-2">Registrate o iniciá sesión para solicitar turnos</p>
        <router-link to="/login" class="btn btn-light btn-sm me-2">Iniciar sesión</router-link>
        <router-link to="/register" class="btn btn-outline-light btn-sm">Registrarse</router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user.js'

const userStore = useUserStore()

const rolLabel = computed(() => {
  if (userStore.rol === 'paciente') return 'paciente'
  if (userStore.rol === 'medico') return 'médico'
  if (userStore.rol === 'admin') return 'administrador'
  return 'visitante'
})

const botonTexto = computed(() => {
  if (userStore.rol === 'paciente') return 'Ver mis turnos'
  if (userStore.rol === 'medico') return 'Ver turnos asignados'
  if (userStore.rol === 'admin') return 'Ver reportes'
  return ''
})

const botonRuta = computed(() => {
  if (userStore.rol === 'paciente') return '/turnos'
  if (userStore.rol === 'medico') return '/turnos'
  if (userStore.rol === 'admin') return '/reportes'
  return '/login'
})
</script>


<style scoped>
.carousel-img {
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.7);
}


.overlay-box {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 10;
}
</style>
