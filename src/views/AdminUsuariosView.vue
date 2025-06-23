<template>
  <div class="container mt-4">
    <h2 class="mb-3">Gestión de Usuarios</h2>

    <!-- Selector de rol -->
    <div class="mb-3">
      <label for="filtroRol" class="form-label">Ver usuarios de tipo:</label>
      <select id="filtroRol" class="form-select w-auto" v-model="filtroRol">
        <option value="medico">Médicos</option>
        <option value="paciente">Pacientes</option>
      </select>
    </div>

    <!-- Tabla reactiva segun rol -->
    <table class="table table-bordered table-hover">
      <thead class="table-light">
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Especialidad</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usuariosFiltrados" :key="user.auth_id">
          <td>{{ user.nombre }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.rol }}</td>
          <td>
            <template v-if="filtroRol === 'medico'">
              <select
                v-model="user.especialidad"
                @change="actualizarEspecialidad(user)"
                class="form-select form-select-sm"
              >
                <option value="clinica">Clínica</option>
                <option value="pediatria">Pediatría</option>
                <option value="neurologia">Neurología</option>
                <option value="dermatologia">Dermatología</option>
                <option value="gastrologia">Gastrología</option>
                <option value="kinesiologia">Kinesiología</option>
              </select>
            </template>
            <span v-else>-</span>
          </td>
          <td>
            <input
              class="form-control form-control-sm"
              :class="user.activo ? 'text-success' : 'text-danger'"
              :value="user.activo ? 'Activo' : 'Inactivo'"
              readonly
              disabled
            />
          </td>
          <td>
            <button
              class="btn btn-sm"
              :class="user.activo ? 'btn-danger' : 'btn-success'"
              data-bs-toggle="modal"
              data-bs-target="#confirmModal"
              @click="usuarioSeleccionado = user"
            >
              {{ user.activo ? 'Desactivar' : 'Activar' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para confirmar -->
    <div
      class="modal fade"
      id="confirmModal"
      tabindex="-1"
      aria-labelledby="confirmModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmModalLabel">Confirmar cambio de estado</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            ¿Estás seguro de que querés
            <strong>
              {{ usuarioSeleccionado?.activo ? 'desactivar' : 'activar' }}
              a {{ usuarioSeleccionado?.nombre || '' }}?
            </strong>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="confirmarCambioEstado"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue'
import { usuariosService } from '../services/usuarios.services.js'

const usuarios = ref([])
const usuarioSeleccionado = ref(null)
const filtroRol = ref('medico') // inicializo valor en "medico"

const usuariosFiltrados = computed(() =>
  usuarios.value.filter(u => u.rol === filtroRol.value)
)

const cargarUsuarios = async () => {
  try {
    usuarios.value = await usuariosService.obtenerTodos()
  } catch (error) {
    console.error('Error al cargar usuarios:', error.message)
  }
}

const actualizarEspecialidad = async (usuario) => {
  try {
    await usuariosService.actualizarEspecialidad(usuario.auth_id, usuario.especialidad)
  } catch (error) {
    console.error('Error al actualizar especialidad:', error.message)
  }
}

const confirmarCambioEstado = async () => {
  if (!usuarioSeleccionado.value) return
  try {
    const nuevoEstado = !usuarioSeleccionado.value.activo
    await usuariosService.cambiarEstadoActivo(usuarioSeleccionado.value.auth_id, nuevoEstado)
    usuarioSeleccionado.value = null
    await cargarUsuarios()
  } catch (error) {
    console.error('Error al cambiar estado:', error.message)
  }
}

onMounted(() => {
  cargarUsuarios()
})
</script>
