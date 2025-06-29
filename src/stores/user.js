import { defineStore } from 'pinia'
import { supabase } from '../supabaseClient/supabaseClient.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    nombre:null,
    email: null,
    rol: null,
    telefono:null,
    direccion: null
  }),

  getters: {
    estaLogeado: (state) => state.id !== null
  },

  actions: {
    
      //Se llama al iniciar la app para cargar el usuario actual desde la sesión activa
     
    async cargarUsuarioDesdeSesion() {
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError || !user) return

      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('auth_id', user.id)
        .single()

      if (!error && data) {
        this.id = data.auth_id
        this.nombre = data.nombre
        this.email = data.email
        this.rol = data.rol
        this.telefono = data.telefono
        this.direccion = data.direccion

        // Actualiza localStorage para los guards
        localStorage.setItem('rol', data.rol)
      }
    },

    
     //Se llama luego del login exitoso
     
    setUserData({ id, email, nombre, telefono, direccion ,rol }) {
      this.id = id
      this.email = email
      this.nombre = nombre
      this.rol = rol
      this.telefono = telefono
      this.direccion = direccion
      localStorage.setItem('rol', rol)
    },

    
     //Se llama al cerrar sesión
     
    clearUserData() {
      this.id = null
      this.email = null
      this.rol = null
      this.nombre = null
      this.telefono = null
      this.direccion = null
      localStorage.removeItem('rol')
    }
  }
})
