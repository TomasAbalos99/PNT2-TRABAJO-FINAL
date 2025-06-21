import { useUserStore } from "../stores/user.js"


export const guards = {
  
   //Protege una ruta según los roles permitidos.
   
  requireRole: (rolesPermitidos) => {
    return (to, from, next) => {
       const userStore = useUserStore()
      if (rolesPermitidos.includes(userStore.rol)) {
        next()
      } else {
        next('/')
      }
    }
  },

  
   //Redirige si el usuario ya tiene sesión iniciada.
   
  redirectIfAuthenticated: () => {
    return (to, from, next) => {
      const userStore = useUserStore()
      if (userStore.rol) {
        next('/')
      } else {
        next()
      }
    }
  },

  
   //Protege una ruta para que solo puedan entrar usuarios autenticados.
  requireAuth: () => {
    return (to, from, next) => {
     const userStore = useUserStore()
      if (userStore.rol) {
        next()
      } else {
        next('/')
      }
    }
  }
} 
