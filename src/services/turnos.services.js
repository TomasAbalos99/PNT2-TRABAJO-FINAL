import { supabase } from '../supabaseClient/supabaseClient.js'

export const turnosService = {
  // Obtener turnos segun rol
  getTurnosPorUsuario: async (auth_id, rol) => {
    let query = supabase.from('turnos').select('*')

    if (rol === 'paciente') {
      query = query.eq('paciente_id', auth_id)
    } else if (rol === 'medico') {
      query = query.eq('medico_id', auth_id)
    }

    const { data, error } = await query.order('fecha', { ascending: true })

    if (error) throw new Error('No se pudieron obtener los turnos')

    return data
  },

  // Crear un nuevo turno (paciente solicita turno con un médico)
  crearTurno: async ({ fecha, motivo, paciente_id, medico_id }) => {
    const { data, error } = await supabase.from('turnos').insert([
      {
        fecha,
        motivo,
        estado: 'pendiente',
        paciente_id,
        medico_id
      }
    ])

    if (error) throw new Error('Error al crear el turno')
    return data
  },

  // Cancelar un turno
  cancelarTurno: async (id) => {
    const { error } = await supabase.from('turnos').update({ estado: 'cancelado' }).eq('id', id)
    if (error) throw new Error('No se pudo cancelar el turno')
  },

  // Editar un turno (por ejemplo, cambiar la fecha o motivo)
  editarTurno: async (id, nuevosDatos) => {
    const { error } = await supabase.from('turnos').update(nuevosDatos).eq('id', id)
    if (error) throw new Error('No se pudo editar el turno')
  }
}
