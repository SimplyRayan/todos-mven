<template>
  <section class="todos-wrapper">
    <div class="todos-container">
      <h2 class="list-title">{{ title }}</h2>
      <!-- LOADING -->
      <ul v-if="!todos">
        <todo-item mode="header"></todo-item>
        <item-skeleton v-for="n in 4" :key="n" :number="n"></item-skeleton>
      </ul>

      <!-- NON EMPTY -->
      <div v-else-if="todos && todos.length > 0">
        <ul>
          <todo-item mode="header"></todo-item>
          <todo-item
            v-for="(todo, index) in currentTodos"
            :key="todo._id"
            :todo="todo"
            :number="(currentPage - 1) * pageSize + index + 1"
            :mode="mode"
          ></todo-item>
        </ul>
        <!--  -->
        <!--  -->
        <div class="pagination">
          <base-button
            class="page-btn"
            @click="currentPage--"
            :isDisabled="currentPage == 1"
          >
            Prev
          </base-button>
          <base-button
            class="page-btn"
            @click="currentPage++"
            :isDisabled="!hasNext"
            >Next</base-button
          >
        </div>
      </div>

      <!--  -->

      <!-- EMPTY -->
      <div v-else class="empty-wrapper">
        <p v-if="mode === 'todo'">You have nothing to do yet!</p>
        <p v-else>You haven't completed any of your todos yet</p>
      </div>
    </div>
  </section>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import BaseButton from "../UI/BaseButton.vue";
import ItemSkeleton from "../todos/ItemSkeleton.vue";
export default {
  components: {
    TodoItem,
    BaseButton,
    ItemSkeleton,
  },
  props: ["title", "todos", "mode"],
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    currentTodos() {
      const startAt = (this.currentPage - 1) * this.pageSize;
      const endsAt = this.currentPage * this.pageSize;
      return this.todos.slice(startAt, endsAt);
    },
    hasNext() {
      return this.currentPage * this.pageSize < this.todos.length;
    },
  },
};
</script>
<style scoped>
.todos-wrapper {
  padding-top: 5rem;
}
.todos-container {
  padding: 2rem 4rem;

  max-width: 75rem;
  margin: 0 auto;
  /*  */
  background-color: #ecdad1;
  border-radius: 5px;
}
.list-title {
  font-size: 4.8rem;
  color: #86746b;
}

ul {
  margin-top: 2rem;
  list-style: none;
  display: flex;
  flex-direction: column;
}
.empty-wrapper {
  margin: 5rem auto;
  width: fit-content;
  font-size: 2.8rem;
  color: #86746bc2;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.page-btn {
  box-sizing: border-box;
  font-size: 2rem;
}
</style>
