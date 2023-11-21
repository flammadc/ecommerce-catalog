import { createRouter, createWebHistory } from "vue-router";
import Item from "../pages/Item.vue";
import Unavailable from "../pages/Unavailable.vue";

const routes = [
  {
    path: "/",
    name: "Item",
    component: Item,
  },
  {
    path: "/unavailable",
    name: "Unavailable",
    component: Unavailable,
  },
];

const router = createRouter({
  history: createWebHistory("/"), // Set your base URL directly here
  routes,
});

export default router;
