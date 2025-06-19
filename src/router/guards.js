export const guards = {
  /**
   * Protege una ruta según los roles permitidos.
   */
  requireRole: (rolesPermitidos) => {
    return (to, from, next) => {
      const rol = localStorage.getItem('rol')
      if (rolesPermitidos.includes(rol)) {
        next()
      } else {
        next('/')
      }
    }
  },

  /**
   * Redirige si el usuario ya tiene sesión iniciada.
   */
  redirectIfAuthenticated: () => {
    return (to, from, next) => {
      const rol = localStorage.getItem('rol')
      if (rol) {
        next('/turnos')
      } else {
        next()
      }
    }
  },

  /**
   * Protege una ruta para que solo puedan entrar usuarios autenticados.
   */
  requireAuth: () => {
    return (to, from, next) => {
      const rol = localStorage.getItem('rol')
      if (rol) {
        next()
      } else {
        next('/')
      }
    }
  }
} 
