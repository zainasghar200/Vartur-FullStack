import { createApp } from "vue";
import App from "./App.vue";
import "./assets/app.css";
import router from "./routes";
import Tooltip from "primevue/tooltip";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import Toaster from "@meforma/vue-toaster";

const app = createApp(App);

app.use(PrimeVue);
app.directive("tooltip", Tooltip);
app.use(Toaster, { position: "top-right", duration: 2000 });

app.use(router).mount("#app");
