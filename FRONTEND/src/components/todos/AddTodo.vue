<template>
  <teleport to="body">
    <div>
      <transition name="backdrop">
        <div v-if="showDialog" @click="closeDialog" class="backdrop"></div>
      </transition>
      <transition name="modal">
        <dialog open v-if="showDialog">
          <h2 class="header">Create New Todo</h2>
          <input
            @keypress.enter="addNewTodo"
            type="text"
            placeholder="Clean the house todos"
            v-model.trim="todoText"
          />
          <base-button @click="addNewTodo" text="Create Todo"></base-button>
        </dialog>
      </transition>
    </div>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      todoText: "",
    };
  },
  computed: {
    showDialog() {
      return this.$store.getters["todos/showTodoDialog"];
    },
  },
  methods: {
    addNewTodo() {
      this.$store.dispatch("todos/addNewTodo", { text: this.todoText });
      this.closeDialog();
    },
    closeDialog() {
      this.$store.dispatch("todos/setDialogState", { show: false });
    },
  },
};
</script>

<style scoped>
.backdrop {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
}

dialog {
  color: #86746b;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  top: 20%;
  margin: 0px auto;
  width: 50rem;
  padding: 4rem 3rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 10;
}

.header {
  font-size: 3.8rem;
}

input {
  padding: 1rem 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  font-size: 2.4rem;
  font-family: inherit;
  height: 4rem;
  transition: 0.3s;
}
input:focus {
  outline: none;
  border: 1px solid #d64045;
  color: #433a36;
}

/* ANIMATIONS */

/* modal */
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.modal-enter-active,
.modal-leave-active {
  transition: 0.5s ease;
}
.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

/* backdrop */
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: 0.8s ease;
}
.backdrop-enter-to,
.backdrop-leave-from {
  opacity: 1;
}

/*  */
</style>
