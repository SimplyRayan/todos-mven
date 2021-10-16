import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./router";
//
import BaseButton from "./components/UI/BaseButton.vue";
//
const app = createApp(App);

app.component("base-button", BaseButton);
//
app.use(store);
app.use(router);
//
app.mount("#app");
