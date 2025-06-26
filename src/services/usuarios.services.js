import { supabase } from '../supabaseClient/supabaseClient.js'

export const usuariosService = {
  obtenerMedicos: async () => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('auth_id, nombre, especialidad') // perdi un monton de tiempo aca
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
  obtenerTodos: async () => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('auth_id, nombre, email, rol, especialidad, activo')

    if (error) {
      throw new Error('Error al obtener usuarios: ' + error.message)
    }

    return data
  },
  cambiarEstadoActivo: async (auth_id, nuevoEstado) => {
    const { error } = await supabase
      .from('usuarios')
      .update({ activo: nuevoEstado })
      .eq('auth_id', auth_id)

    if (error) {
      throw new Error('Error al cambiar estado: ' + error.message)
    }
  },
  actualizarEspecialidad: async (auth_id, nuevaEspecialidad) => {
    const { error } = await supabase
      .from('usuarios')
      .update({ especialidad: nuevaEspecialidad })
      .eq('auth_id', auth_id)

    if (error) {
      throw new Error('Error al actualizar especialidad: ' + error.message)
    }
  }

}
