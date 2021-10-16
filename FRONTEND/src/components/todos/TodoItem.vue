<template>
  <!-- NOT SURE ABOUT THIS..  -->
  <li v-if="mode === 'todo'" class="todo-item">
    <span class="todo-num">{{ number }}</span>
    <span @click="updateStatus(true)" class="todo">{{ todo.text }}</span>
    <span>{{ addedAtDate }}</span>
  </li>
  <!-- OR -->
  <li v-else-if="mode === 'completed'" class="todo-item">
    <span class="todo-num">{{ number }}</span>
    <span @click="updateStatus(false)" class="completed line-through">
      {{ todo.text }}
    </span>

    <span>{{ completedAt }}</span>
  </li>
  <!-- OR -->
  <li v-else class="todo-item header">
    <span class="todo-num">#</span>
    <span>Todo</span>
    <span>Date</span>
  </li>
</template>

<script>
export default {
  props: ["mode", "todo", "number"],
  computed: {
    addedAtDate() {
      // used with current todos
      let date = new Date(this.todo.addedAt);
      return date.toDateString();
    },

    completedAt() {
      // used with completed todos -- Last updated is compledtion update
      let date = new Date(this.todo.updatedAt);
      return date.toDateString();
    },
  },
  methods: {
    updateStatus(isCompleted) {
      this.$store.dispatch("todos/updateStatus", {
        id: this.todo._id,
        isCompleted,
      });
    },
    formatDate(date) {
      let dateString = "";
      if (date.getYear() != Date.now().getYear()) {
        dateString = date.getFullYear();
      } else {
        let hour = date.getHours();
        if (hour < 12) dateString;
        // Calculate Hours
      }
    },
  },
};
</script>

<style scoped>
.todo-item {
  padding: 2rem 1rem;
  font-size: 2.4rem;
  display: grid;
  grid-template-columns: 1fr 10fr 5fr;
  grid-template-rows: 1fr;
  gap: 2rem;
  justify-content: space-between;
  border-bottom: 1px solid #86746b57;
}

/*  */
.todo-item:last-child {
  border-bottom: none;
}
.header {
  color: #86746bd8;
}

/*  */

.todo:hover {
  cursor: pointer;
  text-decoration: line-through;
}
.completed:hover {
  cursor: pointer;
  text-decoration: none;
}
.line-through {
  text-decoration: line-through;
}
</style>
