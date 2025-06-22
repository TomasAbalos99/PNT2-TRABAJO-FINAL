<template>
  <div class="container mt-4">
    <CarouselBackground>
      <div v-if="!rol" class="bg-dark p-3 rounded">
        <h3 class="text-white">Bienvenido a nuestro sistema</h3>
        <router-link to="/login" class="btn btn-primary mt-2">Iniciar sesion</router-link>
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
      <div class="container mt-5">
  <div class="row g-4">
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <img src="/img/medico4.webp" class="card-img-top" alt="Conocé la clínica">
        <div class="card-body">
          <h5 class="card-title">Conocé nuestra clínica</h5>
          <p class="card-text">Descubrí nuestras instalaciones, servicios y el equipo médico que trabaja día a día por tu salud.</p>
          <a href="#" class="btn btn-primary">Ver más</a>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <img src="/img/contactanos.jpg" class="card-img-top" alt="Sucursales">
        <div class="card-body">
          <h5 class="card-title">Sucursales</h5>
          <p class="card-text">Contamos con varias sucursales para que elijas la más cercana a tu domicilio.</p>
          <a href="#" class="btn btn-primary">Buscar sucursal</a>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <img src="/img/Asistencia.webp" class="card-img-top" alt="Contacto">
        <div class="card-body">
          <h5 class="card-title">Contactanos</h5>
          <p class="card-text">¿Tenés dudas o sugerencias? Nuestro equipo está para ayudarte. Escribinos o llamanos.</p>
          <a href="#" class="btn btn-primary">Ir a contacto</a>
        </div>
      </div>
    </div>
  </div>
</div>
  <br>
  <br>
    
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
.card-img-top {
  height: 280px;          
  width: 100%;            
  object-fit: cover;      
  object-position: center;
}

</style>
