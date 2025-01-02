import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Material Design Icons
import "@mdi/font/css/materialdesignicons.css";

// PrimeIcons (if you're actually using them in your app)
import "primeicons/primeicons.css";

import rainbow from "./directives/rainbow.js";

const app = createApp(App);

app.use(createPinia());
app.use(createVuetify({ components, directives, icons: { default: "mdi" } }));
app.use(router);
app.directive("rainbow", rainbow);

app.mount("#app");
