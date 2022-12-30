<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar color="white">
          <img
            src="https://cyberdownload.anrunlu.net/zhixin2.1shot/szdn1.png"
          />
        </q-avatar>
        <q-toolbar-title> 数字大脑团队 </q-toolbar-title>

        <q-tabs
          v-model="currTabRoute"
          shrink
          outside-arrows
          mobile-arrows
          inline-label
          v-if="!$q.platform.is.mobile"
        >
          <q-route-tab
            ripple
            :label="link.label"
            v-for="(link, index) in tablinksData"
            :key="index"
            :to="link.path"
            :icon="link.icon"
          />
        </q-tabs>

        <!-- 打开抽屉按钮，仅移动端 -->
        <q-btn
          v-if="$q.platform.is.mobile"
          flat
          round
          color="white"
          :icon="drawerLeft ? 'menu_open' : 'menu'"
          @click="drawerLeft = !drawerLeft"
        />
      </q-toolbar>
    </q-header>

    <!-- 抽屉，仅移动端 -->
    <q-drawer
      side="left"
      v-model="drawerLeft"
      :width="200"
      :breakpoint="500"
      overlay
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item
            :to="link.path"
            clickable
            v-for="(link, index) in tablinksData"
            :key="index"
            active-class="bg-blue-1 text-primary"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const tablinksData = [
  {
    label: "首页",
    path: "index", // 注意：需要与路由的 path 一致
    icon: "home",
  },
  {
    label: "成员",
    path: "members",
    icon: "people",
  },
  {
    label: "项目",
    path: "projects",
    icon: "science",
  },
  {
    label: "联系我们",
    path: "contact",
    icon: "handshake",
  },
];

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      drawerLeft: false,
      currTabRoute: "index",
      currBtnDropdownLabel: "首页",
      tablinksData: tablinksData,
    };
  },

  methods: {},
};
</script>
