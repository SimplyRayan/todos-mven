<template>
  <header>
    <div class="upper">
      <h1>Tracker</h1>
      <div class="center">
        <base-button @click="showNewTodoDialog" text="New Todo"></base-button>
      </div>
    </div>
    <!--  -->

    <nav class="nav center">
      <router-link to="/me/todos">TODOS</router-link>
      <router-link to="/me/completed">COMPLETED</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    showNewTodoDialog() {
      this.$store.dispatch("todos/setDialogState", { show: true });
    },
  },
};
</script>
<style scoped>
h1 {
  font-size: 5.2rem;
  color: #4e3427;
}
.upper {
  padding: 2rem 1rem;

  background-color: #e0c1b3;
  color: #d64045;
}
.center {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
}
.nav {
  gap: 7rem;
}

a:link,
a:visited {
  padding: 0.5rem 2rem;
  border-radius: 5px;
  font-size: 2.4rem;
  font-weight: 500;
  color: #d64045;
  text-decoration: none;
  transition: 0.5s;
}
a:hover,
a:active,
.router-link-active {
  background-color: #d6404527;
}
</style>
