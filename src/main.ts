import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./app.vue";
import "../assets/css/main.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.mount("#app");
