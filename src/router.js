import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./components/HomeView.vue";
import AboutView from "./components/AboutView.vue";
import ProductView from "./components/ProductView.vue";
import ContactView from "./components/ContactView.vue";
import ProductDetailsView from "./components/ProductDetailsView.vue";
import NotFoundView from "./components/NotFoundView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/products", component: ProductView },
  { path: "/products/:id", component: ProductDetailsView },
  { path: "/about", component: AboutView },
  { path: "/contact", component: ContactView },

  { path: "/p", redirect: "/products" },
  { path: "/:pathMatch(.*)*", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
