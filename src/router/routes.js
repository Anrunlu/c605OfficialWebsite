const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("pages/Index.vue"),
      },
      {
        path: "members",
        name: "members",
        component: () => import("pages/Members.vue"),
      },
      {
        path: "projects",
        name: "projects",
        component: () => import("pages/Projects.vue"),
      },
      {
        path: "joinus",
        name: "joinus",
        component: () => import("pages/Joinus.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
