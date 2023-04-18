/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./routes";
import Tooltip from "primevue/tooltip";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.directive("tooltip", Tooltip);
app.component("Toast", Toast);

app.use(router).mount("#app");
