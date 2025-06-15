
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const id = ref(null)
  const email = ref(null)
  const rol = ref(null)

  function setUserData(userData) {
    id.value = userData.id
    email.value = userData.email
    rol.value = userData.rol
  }

  function clearUserData() {
    id.value = null
    email.value = null
    rol.value = null
  }

  return { id, email, rol, setUserData, clearUserData }
})
