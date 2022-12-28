<template>
  <q-page class="q-my-lg">
    <div class="row q-my-lg justify-center">
      <div class="col-11 col-md-12">
        <q-tabs
          v-model="currProjectOnTab"
          inline-label
          shrink
          outside-arrows
          mobile-arrows
          active-class="text-primary"
        >
          <q-tab
            :name="project.name"
            :icon="project.icon"
            :label="project.name"
            v-for="(project, index) in projectList"
            :key="index"
          />
        </q-tabs>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-9">
        <!-- 项目信息 -->
        <div>
          <div class="text-h5">
            {{ currSelectedProject.name }}
            <a
              :href="currSelectedProject.link"
              target="_blank"
              rel="noopener noreferrer"
              style="text-decoration: none"
              ><q-icon size="xs" name="open_in_new"
            /></a>
          </div>
          <div class="text-body2">{{ currSelectedProject.description }}</div>
        </div>

        <!-- 时间线 -->
        <q-timeline color="secondary">
          <!-- 事件 -->
          <q-timeline-entry
            :title="event.title"
            :subtitle="event.subtitle"
            :icon="event.icon"
            :color="event.color"
            v-for="(event, index) in currSelectedProject.timeline"
            :key="index"
          >
            <!-- 事件内容描述 -->
            <div v-html="event.content" class="q-mb-md text-subtitle1"></div>
            <!-- 图片 -->
            <div class="imgs row q-gutter-md">
              <q-img
                class="col-11 col-md-3 shadow-1 cursor-pointer"
                :src="img"
                :ratio="16 / 9"
                spinner-color="primary"
                spinner-size="10px"
                v-for="(img, index) in event.imgs"
                :key="index"
                @click="showImg(index, event.imgs)"
              />
            </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </div>
  </q-page>
</template>

<script>
const projectList = [
  {
    id: 0,
    name: "知新",
    icon: "img:https://zx-stu.anrunlu.net/favicon.ico",
  },
  {
    id: 1,
    name: "守护曲园",
    icon: "img:https://cyberdownload.anrunlu.net/shqy",
  },
  {
    id: 2,
    name: "疫先锋",
    icon: "apps",
  },
  {
    id: 3,
    name: "学科竞赛",
    icon: "img:http://www.52jingsai.com/favicon.ico",
  },
];

const projectDetailsList = [
  {
    id: 0,
    name: "知新个性化教学平台",
    icon: "img:https://zx-stu.anrunlu.net/favicon.ico",
    description: "",
    link: "https://zx-stu.anrunlu.net",
    timeline: [
      {
        title: "知新v2.1开发",
        subtitle: "2022年12月始",
        icon: "switch_access_shortcut_add",
        color: "positive",
        content: `<span style="color:green">【新版本】</span>启动2.1版平台开发工作，2.1版将继承1.0版在UI设计和操作逻辑上的优点，也将继承在2.0版中已经开发完成的新功能和一些新的灵活的架构设计思路。这是平台开发道路上里程碑意义的事件，也是在探索新一代(指2.0及其后续版本)知新教学过程管理平台的重要转折点。`,
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E8%AF%BE%E7%A8%8B%E7%AE%A1%E7%90%86.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E9%A2%98%E9%9B%86%E7%AE%A1%E7%90%86.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E9%A2%98%E5%BA%93%E7%AE%A1%E7%90%86.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E9%A2%98%E7%9B%AE%E7%BC%96%E8%BE%91.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E4%BD%9C%E4%B8%9A%E6%A6%82%E8%A7%881.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E5%AF%BC%E5%9B%BE.png",
        ],
      },
      {
        title: "知新v2.0上线",
        subtitle: "2022年10月23日",
        content: "",
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/2.0%E5%AD%A6%E7%94%9F%E7%99%BB%E5%BD%95.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/2.0%E4%BD%9C%E4%B8%9A%E6%89%B9%E6%94%B9.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/2.0%E4%BD%9C%E4%B8%9A%E6%89%B9%E6%94%B92.png",
        ],
      },
      {
        title: "Event Title",
        subtitle: "February 22, 1986",
        color: "orange",
        icon: "done_all",
        content: "",
      },
      {
        title: "外语教学数据数字化平台",
        subtitle: "February 22, 1986",
        content: "",
      },
      {
        title: "基于知识图谱的个性化教学平台",
        subtitle: "February 22, 1986",
        content: "",
      },
    ],
  },
];

export default {
  name: "Projects",
  data() {
    return {
      currProjectOnTab: "知新",
      currSelectedProject: projectDetailsList[0],
      projectList: projectList,
    };
  },

  methods: {
    showImg(index, imgList) {
      this.$hevueImgPreview({
        keyboard: true,
        multiple: true,
        nowImgIndex: index,
        imgList: imgList,
        clickMaskCLose: true,
      });
    },
  },
};
</script>
<style>
.he-img-view {
  max-width: 80% !important;
}
</style>
