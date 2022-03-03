import { createApp } from "vue";
import { store, key } from "./store";
import App from "./App.vue";

const myApp = createApp(App);

myApp.use(store, key);

myApp.mount("#app");
