<template>
  <div class="container mt-4">
    <CarouselBackground>
      <div v-if="!rol" class="bg-dark p-3 rounded">
        <h3 class="text-white">Bienvenido a nuestro sistema</h3>
        <router-link to="/login" class="btn btn-primary mt-2">Iniciar sesión</router-link>
      </div>

      <div v-else-if="rol === 'paciente'" class="bg-dark p-3 rounded">
        <h3 class="text-white">Hola, paciente</h3>
        <router-link to="/turnos" class="btn btn-light mt-2">Ver mis turnos</router-link>
      </div>

      <div v-else-if="rol === 'medico'" class="bg-dark p-3 rounded">
        <h3 class="text-white">Hola, doctor</h3>
        <router-link to="/turnos" class="btn btn-light mt-2">Ver turnos asignados</router-link>
      </div>

      <div v-else-if="rol === 'admin'" class="bg-dark p-3 rounded">
        <h3 class="text-white">Hola, administrador</h3>
        <router-link to="/reportes" class="btn btn-light mt-2">Ir a reportes</router-link>
      </div>
    </CarouselBackground>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user.js';
import {useRouter} from 'vue-router';
import { onMounted,computed } from 'vue';
import CarouselBackground from '../components/CarouselBackground.vue'

const userStore = useUserStore();
const router = useRouter();

const rol = computed(() => userStore.rol);

onMounted(() => {
  if (!rol.value) {
    router.push('/login')
  }
})
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 30%;
  width: 100%;
  text-align: center;
  color: white;
  background-color: rgba(0,0,0,0.5);
  padding: 2rem;
}
</style>
