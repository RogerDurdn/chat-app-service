import {
  createRouter, createWebHistory,
} from "vue-router";
import Home from "@/pages/HomeVue.vue";
import Tumb from "@/pages/Tumb.vue";
import WebSock from "@/pages/WebSock.vue";
import ViewError from "@/pages/404View.vue";

const routes = [
  {
    path: "/some",
    name: "Home",
    component: Home,
  },
  {
    path: "/tumb",
    name: "Tumb",
    component: Tumb,
  },
  {
    path: "/",
    name: "WebSock",
    component: WebSock,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "ViewError",
    component: ViewError,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;