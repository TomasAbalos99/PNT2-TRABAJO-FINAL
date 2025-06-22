<template>
  <div id="app" class="d-flex flex-column min-vh-100"> 
    <Navbar />
 <main class="flex-grow-1">
   <transition name="fade" mode="out-in">
    <router-view />
    </transition>
</main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
