import {
  createRouter,
  RouteRecordRaw,
  NavigationGuardNext,
  createWebHistory,
  RouteLocationNormalized,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home"),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    next();
  }
);

export default router;
