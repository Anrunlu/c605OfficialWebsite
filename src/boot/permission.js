import { LoadingBar, Notify } from "quasar";

export default ({ router, store, Vue }) => {
  // 路由守卫
  router.beforeEach(async (to, from, next) => {
    LoadingBar.start(); // 开始进度条
    console.log(to);
    if (to.path == "/") {
      next("/index");
    } else {
      next();
    }
  });

  router.afterEach(() => {
    LoadingBar.stop(); // 结束进度条
  });
};
