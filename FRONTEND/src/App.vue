<template>
  <!--  -->

  <main>
    <router-view v-slot="SlotProps">
      <transition name="root" mode="out-in">
        <component :is="SlotProps.Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
    showNewTodoDialog() {
      return this.$store.getters["todos/showTodoDialog"];
    },
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap");
* {
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Roboto", sans-serif;
}

.root-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.root-enter-active {
  transition: 0.5s ease-out;
}

.root-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

/*  */
/*  */

.root-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.root-leave-active {
  transition: 0.5s ease-in;
}

.root-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
