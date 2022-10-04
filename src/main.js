import { createApp } from "vue";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

require("@/assets/scss/main.scss");

createApp(App).use(autoAnimatePlugin).use(store).use(router).mount("#app");
