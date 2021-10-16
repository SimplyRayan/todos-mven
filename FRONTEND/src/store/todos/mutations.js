export default {
  async setTodos(state, payload) {
    await waitFor(1000); // Just to test skeleton loading

    state.todos = [];
    state.completed = [];

    for (const todo of payload.todos) {
      if (todo.completed) {
        state.completed.push(todo);
      } else {
        state.todos.push(todo);
      }
    }
  },
  addTodo(state, payload) {
    state.todos.push(payload);
  },

  updateStatus(state, payload) {
    const completed = payload.isCompleted;
    const updatedAt = payload.updatedAt;
    let idx;
    // IF IT'S CURRENTLY INCOMPLETE
    if (completed) {
      idx = state.todos.findIndex((todo) => todo._id === payload.id);
      const completedTodo = state.todos.splice(idx, 1)[0];
      completedTodo.updatedAt = updatedAt;
      state.completed.push(completedTodo);
    }
    // IF IT'S CURRENTLY INCOMPLETE
    else {
      idx = state.completed.findIndex(
        (completed) => completed._id === payload.id
      );
      const inCompleteTodo = state.completed.splice(idx, 1)[0];
      inCompleteTodo.updatedAt = null; // it doesn't really matter
      state.todos.push(inCompleteTodo);
    }
  },

  setDialogState(state, payload) {
    state.showTodoDialog = payload.show;
  },
};



// this is to simulate a real loading scenario. It was added just to show the skeleton loading 
function waitFor(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("resolved");
      resolve();
    }, seconds);
  });
}
