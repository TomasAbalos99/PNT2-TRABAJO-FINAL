import { supabase } from '../supabaseClient/supabaseClient.js'

export const usuariosService = {
  obtenerMedicos: async () => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('auth_id, nombre')
      .eq('rol', 'medico')

    if (error) throw new Error('No se pudieron cargar los médicos')

    return data
  },
    obtenerMedicoPorId: async(id) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('nombre, rol')
      .eq('auth_id', id)
      .eq('rol', 'medico')
      .single()

    if (error) {
      console.error('Error al obtener médico:', error.message)
      return null
    }

    return data.nombre
  },

  obtenerPacientePorId: async(id) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('nombre, rol')
      .eq('auth_id', id)
      .eq('rol', 'paciente')
      .single()

    if (error) {
      console.error('Error al obtener paciente:', error.message)
      return null
    }

    return data.nombre
  },
  async actualizarPerfil(id, campos) {
    const { error } = await supabase
      .from('usuarios')
      .update(campos)
      .eq('auth_id', id)

    if (error) {
      throw new Error('Error al actualizar perfil: ' + error.message)
    }
  }
}
