import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "MainForm",
    component: () =>
      import(/* webpackChunkName: "mainForm" */ "../views/MainForm.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  },
  {
    path: "/config",
    name: "Config",
    component: () =>
      import(/* webpackChunkName: "config" */ "../views/Config.vue"),
  },
  {
    path: "/calculation",
    name: "Calculation",
    component: () =>
      import(/* webpackChunkName: "calculation" */ "../views/Calculation.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
