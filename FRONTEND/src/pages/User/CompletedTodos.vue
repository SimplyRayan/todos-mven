<template>
  <todos-list
    title="Completed"
    mode="completed"
    :todos="completed"
  ></todos-list>
</template>

<script>
import TodosList from "../../components/todos/TodosList.vue";

export default {
  components: {
    TodosList,
  },
  computed: {
    completed() {
      return this.$store.getters["todos/completed"];
    },
  },
};
</script>
<style scoped></style>
