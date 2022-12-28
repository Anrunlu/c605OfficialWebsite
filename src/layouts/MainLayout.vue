<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        <q-toolbar-title> 认知智能实验室 </q-toolbar-title>

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
        <!-- 手机端 -->
        <q-btn-dropdown
          flat
          :label="currBtnDropdownLabel"
          text-color="white"
          v-if="$q.platform.is.mobile"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="(link, index) in tablinksData"
              :key="index"
              @click="handleBtnDropdownItemClick(link)"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

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
    label: "加入我们",
    path: "joinus",
    icon: "handshake",
  },
];

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      currTabRoute: "index",
      currBtnDropdownLabel: "首页",
      tablinksData: tablinksData,
    };
  },

  methods: {
    handleBtnDropdownItemClick(link) {
      this.currBtnDropdownLabel = link.label;
      this.$router.push(link.path);
    },
  },
};
</script>
