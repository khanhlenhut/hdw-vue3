import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./pages/HomeView.vue";
import AboutView from "./pages/AboutView.vue";
import ProductView from "./pages/ProductView.vue";
import ContactView from "./pages/ContactView.vue";
import ProductDetailsView from "./pages/ProductDetailsView.vue";
import NotFoundView from "./pages/NotFoundView.vue";

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
