import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import rainbow from "./directives/rainbow.js";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(pinia);
app.use(vuetify);
app.use(router);
app.directive("rainbow", rainbow);
app.mount("#app");
