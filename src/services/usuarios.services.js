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
    
  actualizarPerfil: async(id, campos) => {
    const { error } = await supabase
      .from('usuarios')
      .update(campos)
      .eq('auth_id', id)

    if (error) {
      throw new Error('Error al actualizar perfil: ' + error.message)
    }
  },
  obtenerUsuarioPorId: async (id) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('nombre, telefono, direccion, email, rol')
    .eq('auth_id', id)
    .single()

  if (error) {
    console.error('Error al obtener usuario:', error.message)
    return null
  }

  return data
},
}
