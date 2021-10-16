import { createRouter, createWebHistory } from "vue-router";

import UserPage from "./pages/User/UserPage.vue";
import MyTodos from "./pages/User/MyTodos.vue";
import CompletedTodos from "./pages/User/CompletedTodos.vue";
//
//
import UserSignup from "./pages/auth/UserSignup.vue";
import UserLogin from "./pages/auth/UserLogin.vue";

import store from "./store/index";
//
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/me" },
    {
      path: "/me",
      redirect: "/me/todos",
      meta: {
        requiresAuth: true,
      },
      component: UserPage,
      children: [
        { path: "todos", component: MyTodos },
        { path: "completed", component: CompletedTodos },
      ],
    },
    { path: "/signup", component: UserSignup, meta: { requiresUnAuth: true } },
    { path: "/login", component: UserLogin, meta: { requiresUnAuth: true } },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/signup");
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next("/me");
  } else {
    next();
  }
});

export default router;
