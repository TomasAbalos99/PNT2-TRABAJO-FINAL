<template>
  <div class="home-container">
    <h1>Bienvenido a Gestión de Turnos Medicos</h1>
    <p>Accedé a tu cuenta para administrar tus turnos, o solicitar uno nuevo.</p>

    <router-link to="/login">
      <button>Iniciar sesion</button>
    </router-link>

    <router-link to="/register">
      <button>Registrarse</button>
    </router-link>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 40px;
}

button {
  margin: 10px;
  padding: 10px 20px;
}
</style>
