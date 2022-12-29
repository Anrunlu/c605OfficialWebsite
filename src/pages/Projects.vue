<template>
  <q-page class="q-my-lg">
    <!-- 项目列表 -->
    <div class="row q-my-lg justify-center">
      <div class="col-11 col-md-12">
        <q-tabs
          v-model="currProjectId"
          inline-label
          shrink
          outside-arrows
          mobile-arrows
          active-class="text-primary"
        >
          <q-tab
            :name="project._id"
            :icon="project.icon"
            :label="project.name"
            v-for="(project, index) in projectList"
            :key="index"
          />
        </q-tabs>
      </div>
    </div>

    <!-- 项目详细信息 -->
    <div class="row justify-center">
      <div class="col-9">
        <div>
          <div class="text-h5">
            <!-- 项目名称 -->
            {{ currSelectedProject.name }}
            <!-- 项目链接 -->
            <a
              :href="currSelectedProject.link"
              target="_blank"
              rel="noopener noreferrer"
              style="text-decoration: none"
              ><q-icon size="xs" name="open_in_new"
            /></a>
          </div>
          <!-- 项目描述 -->
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
            <template v-slot:title>
              <!-- 事件标题 -->
              <div class="text-h6">{{ event.title }}</div>
              <!-- 主要参与成员 -->
              <div v-if="event.members.length > 0" class="q-mt-xs q-gutter-xs">
                <q-chip
                  square
                  :dense="$q.screen.lt.sm"
                  v-for="(member, index) in event.members"
                  :key="index"
                  class="cursor-pointer"
                  size="sm"
                  outline
                >
                  <q-avatar>
                    <img :src="member.avatar" />
                  </q-avatar>
                  {{ member.name }}

                  <q-tooltip>
                    {{ member.position }}
                  </q-tooltip>
                </q-chip>
              </div>
            </template>

            <!-- 事件内容描述 -->
            <div v-html="event.content" class="q-mb-md text-subtitle1"></div>
            <!-- 图片描述 -->
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
// 项目列表
const projectList = [
  {
    _id: 0,
    name: "知新",
    icon: "img:https://zx-stu.anrunlu.net/favicon.ico",
    themeColor: "primary",
  },
  {
    _id: 1,
    name: "守护曲园",
    icon: "img:https://cyberdownload.anrunlu.net/shqy",
    themeColor: "positive",
  },
  {
    _id: 2,
    name: "疫先锋",
    icon: "apps",
    themeColor: "accent",
  },
  {
    _id: 3,
    name: "学科竞赛",
    icon: "img:http://www.52jingsai.com/favicon.ico",
    themeColor: "orange",
  },
];

// 项目详细信息列表
const projectDetailsList = [
  {
    _id: 0,
    name: "知新个性化教学平台",
    icon: "img:https://zx-stu.anrunlu.net/favicon.ico",
    description: "",
    link: "https://zx-stu.anrunlu.net",
    timeline: [
      {
        title: "v2.1开发",
        subtitle: "2022年12月始",
        icon: "switch_access_shortcut_add",
        color: "positive",
        content: `<p><span style="color:green">【新版本】</span>启动2.1版平台开发工作，2.1版将继承1.0版在UI设计和操作逻辑上的优点，也将继承在2.0版中已经开发完成的新功能和一些新的灵活的架构设计思路。这是平台开发道路上里程碑意义的事件，也是在探索新一代(指2.0及其后续版本)知新个性化教学平台的重要转折点🛥。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E8%AF%BE%E7%A8%8B%E7%AE%A1%E7%90%86.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E9%A2%98%E9%9B%86%E7%AE%A1%E7%90%86.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E9%A2%98%E5%BA%93%E7%AE%A1%E7%90%86.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E9%A2%98%E7%9B%AE%E7%BC%96%E8%BE%91.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E4%BD%9C%E4%B8%9A%E6%A6%82%E8%A7%881.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E5%AF%BC%E5%9B%BE.png",
        ],
        members: [
          {
            name: "安润鲁",
            avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
            position: "平台架构负责人、平台全栈开发",
            description: "",
          },
        ],
      },
      {
        title: "知新运营一周年&v2.0上线",
        subtitle: "2022年10月10日",
        icon: "cake",
        color: "red",
        content: `<p>🎉10月10日是知新平台运营一周年纪念日🎉，同时也是知新2.0版正式运营的第一天。
          <br>知新2.0<strong>用户界面</strong>秉持“化繁为简”的理念，采用全新的UI，设计和重构了题目作答、作业批改等页面，努力给用户带来简洁易用的体验感；
          <br>知新2.0<strong>系统后台</strong>坚持“稳定安全”的原则，在此基础上全面分析和优化关键业务的处理流程，努力降低系统响应时间，给用户带来顺畅的体验；
          </p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/2.0%E5%AD%A6%E7%94%9F%E7%99%BB%E5%BD%95.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/2.0%E4%BD%9C%E4%B8%9A%E6%89%B9%E6%94%B9.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/2.0%E4%BD%9C%E4%B8%9A%E6%89%B9%E6%94%B92.png",
        ],
        members: [],
      },
      {
        title: "知新平台v1.0上线",
        subtitle: "February 22, 1986",
        color: "orange",
        icon: "done_all",
        content: "",
        members: [],
      },
      {
        title: "外语教学数据数字化平台",
        subtitle: "February 22, 1986",
        content: "",
        members: [],
      },
      {
        title: "基于知识图谱的个性化教学平台(知你)",
        subtitle: "2018年08月28日—2020年09月01日",
        icon: "military_tech",
        content: `<p>作为知新平台的鼻祖，知你个性化教学平台是探索基于知识图谱的个性化教学的初次尝试。在这次的尝试中团队积累了宝贵的经验，实践也印证了数字化教学有着超高的效率和便捷性，是大势所趋。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E7%99%BB%E5%BD%95.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E5%9B%BE%E7%89%87%202.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E5%9B%BE%E7%89%87%203.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E5%9B%BE%E7%89%87%204.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E5%9B%BE%E7%89%87%205.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E5%9B%BE%E7%89%87%206.png",
        ],
        members: [
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "平台架构负责人、平台全栈开发",
            description: "",
          },
        ],
      },
    ],
  },
  {
    _id: 1,
    name: "守护曲园",
    icon: "img:https://cyberdownload.anrunlu.net/shqy",
    description: "",
    link: "",
    timeline: [
      {
        title: "守护曲园",
        subtitle: "2020年01月05日-至今",
        icon: "home",
        color: "brown",
        content: `<p>这里是描述信息......</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy1.jpg",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy2.jpg",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy3.jpg",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy4.jpg",
        ],
        members: [
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "负责人",
            description: "",
          },
        ],
      },
    ],
  },
  {
    _id: 2,
    name: "疫先锋",
    description: "",
    link: "https://zx-stu.anrunlu.net",
    timeline: [
      {
        title: "Event Title",
        subtitle: "February 22, 1986",
        color: "orange",
        icon: "done_all",
        content: "",
        members: [],
      },
    ],
  },
  {
    _id: 3,
    name: "学科竞赛",
    icon: "img:http://www.52jingsai.com/favicon.ico",
    description: "",
    link: "https://zx-stu.anrunlu.net",
    timeline: [
      {
        title: "Event Title",
        subtitle: "February 22, 1986",
        color: "orange",
        icon: "done_all",
        content: "",
        members: [],
      },
    ],
  },
];

export default {
  name: "Projects",
  data() {
    return {
      currProjectId: 0,
      currSelectedProject: projectDetailsList[0],
      projectList: projectList,
    };
  },

  watch: {
    currProjectId: function (val) {
      this.currSelectedProject = projectDetailsList.find(
        (item) => item._id === val
      );
    },
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
