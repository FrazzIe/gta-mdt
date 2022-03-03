import { createApp } from "vue";
import { store, key } from "./store";
import App from "./App.vue";

// General Font
import "vfonts/Lato.css";
// Monospace Font
import "vfonts/FiraCode.css";

const myApp = createApp(App);

myApp.use(store, key);

myApp.mount("#app");
