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
            :alert="project.alert ? project.alertColor : false"
            :alert-icon="project.alertIcon"
          >
          </q-tab>
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
              <!-- 参与成员，目前只分两级，主要的和次要的 -->
              <div v-if="event.members.length > 0" class="q-mt-xs q-gutter-xs">
                <q-chip
                  square
                  :dense="$q.screen.lt.sm"
                  v-for="(member, index) in event.members.filter(
                    (member) => member.role == 'primary'
                  )"
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

                <q-space />

                <q-chip
                  square
                  :dense="$q.screen.lt.sm"
                  v-for="(member, index) in event.members.filter(
                    (member) => member.role == 'secondary'
                  )"
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
    role: "primary",
    themeColor: "primary",
    alert: true,
    alertColor: "red",
    alertIcon: "military_tech",
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
    icon: "img:https://cyberdownload.anrunlu.net/zhixin2.1shot/yixianf2.png",
    themeColor: "accent",
  },
  {
    _id: 3,
    name: "学科竞赛",
    icon: "img:http://www.52jingsai.com/favicon.ico",
    themeColor: "orange",
  },
  {
    _id: 4,
    name: "其他项目",
    icon: "apps",
    themeColor: "primary",
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
            role: "primary",
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
        subtitle: "2021年10月10日",
        color: "primary",
        icon: "done_all",
        content: "",
        members: [],
      },
      {
        title: "外语教学数据数字化平台",
        subtitle: "February 22, 1986",
        content: "",
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy1.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy2.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy3.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy4.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy5.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy6.png",
        ],
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
            role: "primary",
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
            role: "primary",
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
        title: "第十八届“挑战杯”曲阜师范大学大学生课外学术科技作品竞赛",
        subtitle: "2022年10月07日-2023年06月30日",
        color: "brown",
        content:
          "以“疫先锋——知识与数据双驱动的疫情防控与决策平台”作为此次的参赛项目。该平台实现了从疫情预警、流调分析到预案生成全过程数智化、自动化的疫情防控与决策功能。在项目提交之前，团队成员做了明确的分工，以保证高效率、高质量的完成比赛所需的提交材料。由于疫情政策的改变，团队后期对该平台做了一定的升级，以此来更好的适应当下的政策，同时更好的满足用户需求。",
        imgs: [
          "http://cyberdownload.anrunlu.net/2021412977-1671454863369.png",
          "http://cyberdownload.anrunlu.net/2021412977-1671454846869.png",
          "http://cyberdownload.anrunlu.net/2021412977-1671454520923.png",
          "http://cyberdownload.anrunlu.net/2021412977-1671454388285.png",
          "http://cyberdownload.anrunlu.net/2021412984-1672314103654.png",
          "http://cyberdownload.anrunlu.net/2021412984-1672314097225.png",
        ],
        members: [
          {
            name: "王茂励",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455043230.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院院长",
          },
          {
            name: "周子力",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师",
            role: "secondary",
            description: "副教授",
          },
          {
            name: "范瑞红",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455081085.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院书记",
          },
          {
            name: "徐沛玉",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
            position: "项目负责人",
            role: "primary",
            description: "物联网工程",
          },
          {
            name: "李林",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "安润鲁",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455099712.jpg",
            position: "团队成员",
            role: "primary",
            description: "智能数据",
          },
          {
            name: "张珠琛",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455184591.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "田丰",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "王寒寒",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455214709.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
      {
        title: "山东省大学生科技创新大赛",
        subtitle: "2022年10月28日-2022年12月15日",
        icon: "home",
        color: "brown",
        content:
          "此次比赛，一共有三个参赛作品，分别是——曲际岛--基于认知智能与智慧网络的大学社交元宇宙、疫先锋——知识与数据双驱动的疫情防控与决策平台、知新——个性化教学过程管理平台，这三个参赛作品分别由三位负责人带领。在这三个项目中，曲际岛项目的整改工作相对较多，所以比赛前的准备工作主要放在了该项目，时间紧任务重，不过由于团队成员合理的时间分配，顺利完成了比赛准备工作。",
        imgs: [
          "http://cyberdownload.anrunlu.net/2021412984-1672315115823.jpg",
          "http://cyberdownload.anrunlu.net/2021412984-1672315108197.jpg",
          "http://cyberdownload.anrunlu.net/2021412984-1672315102799.jpg",
          "http://cyberdownload.anrunlu.net/2021412984-1672315089842.png",
          "http://cyberdownload.anrunlu.net/2021412984-1672315070704.png",
          "http://cyberdownload.anrunlu.net/2021412977-1671454933467.png",
        ],
        members: [
          {
            name: "王茂励",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455043230.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院院长",
          },
          {
            name: "周子力",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师",
            role: "secondary",
            description: "副教授",
          },
          {
            name: "范瑞红",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455081085.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院书记",
          },
          {
            name: "徐沛玉",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
            position: "项目负责人",
            role: "primary",
            description: "物联网工程",
          },
          {
            name: "李林",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "安润鲁",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455099712.jpg",
            position: "团队成员",
            role: "primary",
            description: "智能数据",
          },
          {
            name: "张珠琛",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455184591.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "田丰",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "王寒寒",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455214709.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
      {
        title: "中国互联网“+”大学生创新创业大赛",
        subtitle: "2022年3月28日-2022年11月15日",
        icon: "home",
        color: "brown",
        content:
          "此次比赛以“明冠沁心”——数字大脑平台作为比赛的参赛项目，该平台的设计意在体现当下个性化教学、因材施教的教学理念；在报名提交材料之前，团队成员做了具体的分工，工作主要分为两大部分——平台完善、参赛材料的编写。由于团队成员合理的合作，保证了参赛作品的高质量的完成。不负期待，该参赛作品取得了不错的成绩。经过这次比赛，参赛成员懂得了如何合作、如何独立解决问题、如何将学到的知识合理利用。",
        imgs: [
          "http://cyberdownload.anrunlu.net/2021412984-1672315807110.png",
          "http://cyberdownload.anrunlu.net/2021412984-1672315803097.png",
          "http://cyberdownload.anrunlu.net/2021412984-1672315798433.png",
          "http://cyberdownload.anrunlu.net/2021412984-1672315794696.png",
          "http://cyberdownload.anrunlu.net/2021412984-1672315791235.png",
          "http://cyberdownload.anrunlu.net/2021412984-1672315786176.png",
        ],
        members: [
          {
            name: "王茂励",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455043230.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院院长",
          },
          {
            name: "周子力",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师",
            role: "secondary",
            description: "副教授",
          },
          {
            name: "范瑞红",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455081085.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院书记",
          },
          {
            name: "徐沛玉",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
            position: "项目负责人",
            role: "primary",
            description: "物联网工程",
          },
          {
            name: "李林",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "张中健",
            avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "安润鲁",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455099712.jpg",
            position: "团队成员",
            role: "primary",
            description: "智能数据",
          },
          {
            name: "张珠琛",
            avatar:
              "http://cyberdownload.anrunlu.net/2021412977-1671455184591.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
    ],
  },
  {
    _id: 4,
    name: "其他项目",
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
