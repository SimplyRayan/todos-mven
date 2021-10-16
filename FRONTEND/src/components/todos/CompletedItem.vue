<template>
  <!-- NOT SURE ABOUT THIS-->
  <li v-if="mode === 'todo'" class="todo-item">
    <span class="todo-num">{{ number }}</span>
    <span @click="FinishTodo()" class="todo-text">{{ todo }}</span>
  </li>
  <!-- OR -->
  <li class="todo-item">
    <span class="todo-num">{{ number }}</span>
    <span class="line-through">{{ todo }}</span>
  </li>
  <!-- OR -->
  <li v-else class="todo-item header">
    <span class="todo-num">#</span>
    <span>Todo</span>
  </li>
</template>

<script>
export default {
  props: ["mode", "id", "number", "todo"],
  methods: {
    uncompleteTODO() {
      this.$store.dispatch("todos/completeTodo", { id: this.id });
    },
  },
};
</script>

<style scoped>
.todo-item {
  padding: 2rem 1rem;
  font-size: 2.4rem;
  display: flex;
  gap: 10rem;
  border-bottom: 1px solid #86746b57;
}

.todo-item:last-child {
  border-bottom: none;
}
.header {
  color: #86746bd8;
}

.todo-text:hover {
  cursor: pointer;
  text-decoration: line-through;
}
.line-through {
  text-decoration: line-through;
}
</style>
