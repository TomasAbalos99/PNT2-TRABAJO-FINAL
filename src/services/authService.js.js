import { supabase } from "../supabaseClient/supabaseClient.js"

export const authService = {
  login: async (email, password) => {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (authError) throw new Error('Email o contraseña incorrectos')

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user
    const rol = user?.user_metadata?.rol || 'paciente'

    return {
      id: user.id,
      email: user.email,
      rol
    }
  },

   register: async (email, password, nombre, rol = 'paciente', especialidad = '', matricula = '') => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          rol // se guarda en user_metadata de supa
        }
      }
    })

    if (authError) throw new Error(authError.message)

    const userId = authData.user.id

    // Insertar en tabla usuarios
    const { error: dbError } = await supabase
      .from('usuarios')
      .insert([{ id: userId, email, nombre }])

    if (dbError) throw new Error(dbError.message)

    // Si es medico, tambien va en la tabla de medicos.
    if (rol === 'medico') {
      const { error: medicoError } = await supabase
        .from('medicos')
        .insert([{ id: userId, especialidad, matricula }])

      if (medicoError) throw new Error(medicoError.message)
    }

    return { id: userId, email, nombre, rol }
  }
}
