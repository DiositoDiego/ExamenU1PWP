<template>
  <div class="landing-page">
    <b-container class="background text-center">
      <b-row>
        <b-col md="8" class="mx-auto">
          <h1 class="display-3">Bienvenido a nuestro sistema de vehículos</h1>
          <p class="lead">
            Registra y consulta vehículos de manera sencilla y rápida.
          </p>
          <hr class="my-4">
          <p>
            Explora las características y encuentra la información que necesitas.
          </p>
          <b-button variant="primary" @click="iniciar" class="mt-4">Iniciar</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {
    iniciar() {
      this.$router.push('/list');
    }
  }
};
</script>

<style scoped>
.landing-page {
  background-image: url('https://cdn-3.expansion.mx/dims4/default/1c6af77/2147483647/strip/true/crop/1920x1280+0+0/resize/1800x1200!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fda%2F11%2F3736d8b244a1be6b6c2df44c90c0%2Fcuartoscuro-661048-digital.jpeg'); /* Cambia la URL según tu imagen de fondo */
  background-size: cover;
  background-position: center center;
  color: #fff;
  height: 100vh;
  display: flex;
  align-items: center;
}

.display-3,
.lead,
.btn-primary {
  color: #fff;
}

.background {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 50px;
}

.btn-primary:hover {
  background-color: #2e6da4; /* Color de hover de Bootstrap por defecto */
}
</style>
