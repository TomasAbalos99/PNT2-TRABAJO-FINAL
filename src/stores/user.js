import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const id = ref(null)
  const email = ref(null)
  const rol = ref(null)

  const setUserData = (userData) => {
    id.value = userData.id
    email.value = userData.email
    rol.value = userData.rol
    localStorage.setItem('rol', userData.rol) // opcional si querés persistirlo
  }

  const clearUserData = () => {
    id.value = null
    email.value = null
    rol.value = null
    localStorage.removeItem('rol') // 👈 limpia al cerrar sesión
  }

  return {
    id,
    email,
    rol,
    setUserData,
    clearUserData
  }
})
