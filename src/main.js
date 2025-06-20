import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useUserStore } from './stores/user.js'


const app = createApp(App);

app.use(createPinia())
app.use(router);

const userStore = useUserStore()

userStore.cargarUsuarioDesdeSesion().then(() => {
  app.mount('#app')
})