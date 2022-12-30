export default ({ router, store, Vue }) => {
  // 路由守卫
  router.beforeEach(async (to, from, next) => {
    if (to.path == "/") {
      next("/index");
    } else {
      next();
    }
  });

  router.afterEach(() => {});
};
