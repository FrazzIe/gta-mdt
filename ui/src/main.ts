import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// General Font
import "vfonts/Lato.css";
// Monospace Font
import "vfonts/FiraCode.css";

const myApp = createApp(App);

myApp.use(createPinia());

myApp.mount("#app");
