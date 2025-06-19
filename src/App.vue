<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import { onMounted } from 'vue'
import { useUserStore } from './stores/user.js'
import { supabase } from './supabaseClient/supabaseClient.js'

const userStore = useUserStore()


onMounted(async () => {
  const { data, error } = await supabase.auth.getUser()
  const user = data.user

  if (user) {
    const rol = user.user_metadata?.rol || 'paciente'
    userStore.setUserData({
      id: user.id,
      email: user.email,
      rol
    })
  } else {
    userStore.clearUserData()
  }
})
</script>

<style>
</style>
