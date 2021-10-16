<template>
  <todos-list title="My Todos" mode="todo" :todos="todos"></todos-list>
</template>

<script>
import TodosList from "../../components/todos/TodosList.vue";
export default {
  components: {
    TodosList,
  },
  computed: {
    todos() {
      return this.$store.getters["todos/todos"];
    },
  },
};
</script>
<style scoped></style>
