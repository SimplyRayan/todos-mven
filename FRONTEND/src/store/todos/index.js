import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
  namespaced: true,
  state() {
    return {
      showTodoDialog: false,
      todos: null,
      completed: null,
    };
  },

  getters,
  mutations,
  actions,
};
