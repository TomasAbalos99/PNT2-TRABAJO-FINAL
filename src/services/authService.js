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

  register: async (email, password, nombre, rol, especialidad, matricula) => {
    //Registrar en Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre, rol, especialidad, matricula } // guardado en user_metadata
      }
    })

    if (signUpError) {
      console.log('Error en signUp:', signUpError)
      throw new Error(signUpError.message)
    }

    const user = data.user

    //Insertar en la tabla usuarios
    const { error: insertError } = await supabase.from('usuarios').insert({
      auth_id: user.id,
      email,
      nombre,
      rol,
      especialidad: rol === 'medico' ? especialidad : null,
      matricula: rol === 'medico' ? matricula : null
    })

    if (insertError) {
      console.log('Error insertando en tabla usuarios:', insertError)
      throw new Error('No se pudo guardar el usuario en la base de datos')
    }

    //Devolver datos al frontend (Pinia)
    return {
      id: user.id,
      email: user.email,
      rol
    }
  }
}
