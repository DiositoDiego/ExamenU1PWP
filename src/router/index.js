import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/LandingPage.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPage,
    },
    {
      path: "/",
      component: {
        render(h) {
          return h("router-view");
        },
      },
      children: [
        {
          path: "/",
          name: "layout",
          component: () => import("../views/Layout.vue"),
          children: [
            {
              path: "/create",
              name: "create",
              component: () => import("../views/Create.vue"),
            },
            {
              path: "/list",
              name: "list",
              component: () => import("../views/List.vue"),
            },
          ],
        }
      ],
    },
  ],
});

export default router;
