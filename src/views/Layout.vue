<template>
  <div class="app-container">
    <div class="sidebar">
      <div class="logo">
        <span>Logo</span>
      </div>
      <b-nav vertical>
        <b-nav-item to="/create">Crear auto</b-nav-item>
        <b-nav-item to="/list">Consultar autos</b-nav-item>
      </b-nav>
    </div>

    <div class="content">
      <div class="navbar">
        <b-breadcrumb>
          <b-breadcrumb-item href="/">
            <b-icon
              icon="house-fill"
              scale="1.25"
              shift-v="1.25"
              aria-hidden="true"
            ></b-icon>
            Inicio
          </b-breadcrumb-item>
          <b-breadcrumb-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.href"
            :active="item.active"
          >
            {{ item.text }}
          </b-breadcrumb-item>
        </b-breadcrumb>
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Agregar",
          href: "/create",
          active: false,
        },
        {
          text: "Consultar",
          href: "/list",
          active: true,
        },
      ],
    };
  },
  watch: {
    $route(to) {
      this.items.forEach((item) => {
        item.active = item.href === to.path;
      });
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #333;
  color: #fff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
