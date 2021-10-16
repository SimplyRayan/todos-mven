<template>
  <div>
    <user-header></user-header>
    <add-todo></add-todo>
    <router-view v-slot="{ Component }">
      <transition name="view" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import UserHeader from "../../components/layout/UserHeader.vue";
import AddTodo from "../../components/todos/AddTodo.vue";
export default {
  components: {
    UserHeader,
    AddTodo,
  },
  created() {
    this.$store.dispatch("todos/loadTodos");
  },
};
</script>

<style scoped>
.view-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.view-enter-active {
  transition: 0.3s ease-out;
}

.view-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/*  */

.view-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.view-leave-active {
  transition: 0.3s ease-in;
}

.view-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
