import { createStore } from "vuex";
//
import todosModule from "./todos/index";
import authModule from "./auth/index";
//
const store = createStore({
  modules: {
    todos: todosModule,
    auth: authModule,
  },
});

export default store;
