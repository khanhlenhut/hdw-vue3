import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./pages/HomeView.vue";
import AboutView from "./pages/AboutView.vue";
import ProductsView from "./pages/ProductsView.vue";
import ProductsListView from "./pages/ProductsListView.vue";
import ProductDetailView from "./pages/ProductDetailView.vue";
import ContactView from "./pages/ContactView.vue";
import NotFoundView from "./pages/NotFoundView.vue";
import LoginView from "@/pages/LoginView.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },

  { path: "/", name: "home", component: HomeView },
  {
    path: "/products",
    component: ProductsView,
    children: [
      {
        path: "",
        name: "product-list",
        component: ProductsListView,
        children: [
          {
            path: ":id",
            name: "product-details",
            component: ProductDetailView,
          },
        ],
      },
    ],
  },
  { path: "/about", name: "about", component: AboutView },
  { path: "/contact", name: "contact", component: ContactView },
  { path: "/p", redirect: "/products" },
  { path: "/:pathMatch(.*)*", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
