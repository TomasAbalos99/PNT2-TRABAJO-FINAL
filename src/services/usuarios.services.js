import { supabase } from '../supabaseClient/supabaseClient.js'

export const usuariosService = {
  obtenerMedicos: async () => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('auth_id, nombre')
      .eq('rol', 'medico')

    if (error) throw new Error('No se pudieron cargar los médicos')

    return data
  }
}
