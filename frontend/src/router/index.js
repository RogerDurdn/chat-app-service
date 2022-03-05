import { createWebHistory, createRouter } from "vue-router";
import Home from "@/pages/HomeVue.vue";
import Tumb from "@/pages/Tumb.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tumb",
    name: "Tumb",
    component: Tumb,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;