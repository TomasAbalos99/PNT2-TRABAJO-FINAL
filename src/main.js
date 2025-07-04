import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

const userStore = useUserStore()

userStore.cargarUsuarioDesdeSesion().then(() => {
  app.mount('#app')
})