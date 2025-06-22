<template>
  <div class="container my-5" style="max-width: 600px">
    <h2 class="text-center mb-4">Mi Perfil</h2>
<transition name="fade" mode="out-in">
    <div v-if="!modoEdicion">
      <ul class="list-group mb-4">
        <li class="list-group-item"><strong>Nombre:</strong> {{ nombre }}</li>
        <li class="list-group-item"><strong>Teléfono:</strong> {{ telefono }}</li>
        <li class="list-group-item"><strong>Dirección:</strong> {{ direccion }}</li>
        <li class="list-group-item"><strong>Email:</strong> {{ userStore.email }}</li>
        <li class="list-group-item"><strong>Rol:</strong> {{ userStore.rol }}</li>
      </ul>

      <div class="d-flex justify-content-center gap-3">
        <button class="btn btn-primary" @click="modoEdicion = true">Editar perfil</button>
        <button class="btn btn-secondary" @click="router.push('/')">Volver al inicio</button>
      </div>
    </div>

    <form v-else @submit.prevent="guardarCambios">
      <div class="mb-3">
        <label class="form-label">Nombre completo</label>
        <input v-model="nombre" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Teléfono</label>
        <input v-model="telefono" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Dirección</label>
        <input v-model="direccion" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input :value="userStore.email" type="email" class="form-control" disabled />
      </div>

      <div class="mb-4">
        <label class="form-label">Rol</label>
        <input :value="userStore.rol" type="text" class="form-control" disabled />
      </div>

      <div class="d-flex justify-content-center gap-3">
        <button type="submit" class="btn btn-success">Guardar cambios</button>
        <button type="button" class="btn btn-secondary" @click="modoEdicion = false">Cancelar</button>
      </div>
    </form>
  </transition>
    <div v-if="mensaje" class="alert alert-success text-center mt-3">
      {{ mensaje }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { usuariosService } from '../services/usuarios.services.js'

const router = useRouter()
const userStore = useUserStore()

const nombre = ref('')
const telefono = ref('')
const direccion = ref('')
const mensaje = ref('')
const modoEdicion = ref(false)

const cargarPerfil = async () => {
  const data = await usuariosService.obtenerUsuarioPorId(userStore.id)
  if (data) {
    nombre.value = data.nombre || ''
    telefono.value = data.telefono || ''
    direccion.value = data.direccion || ''
  }
}

const guardarCambios = async () => {
  try {
    await usuariosService.actualizarPerfil(userStore.id, {
      nombre: nombre.value,
      telefono: telefono.value,
      direccion: direccion.value
    })
    mensaje.value = 'Perfil actualizado correctamente.'
    modoEdicion.value = false

    
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  cargarPerfil()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>