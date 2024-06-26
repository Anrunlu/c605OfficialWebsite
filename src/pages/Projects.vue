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
            @click="handleChangeTabItem(project._id)"
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
              v-if="currSelectedProject.link"
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
        <q-timeline color="primary">
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
                  v-for="member in event.members.filter(
                    (member) => member.role == 'primary'
                  )"
                  :key="member.avatar"
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
                class="col-11 col-md-3 col-lg-2 shadow-1 cursor-pointer"
                :src="img"
                :ratio="16 / 9"
                spinner-color="primary"
                spinner-size="10px"
                v-for="(img, index) in event.imgs"
                :key="index"
                @click="showImg(index, event.imgs)"
              />
            </div>
            <div class="q-pa-md" v-if="event.videos">
              <q-video
                :ratio="16 / 9"
                src="https://cyberdownload.anrunlu.net/f697001b-1062-4af7-b8e5-db0b4fbb71f6.mp4"
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
    icon: "img:https://stu.z-xin.net/favicon.ico",
    role: "primary",
    themeColor: "primary",
    alert: true,
    alertColor: "red",
    alertIcon: "military_tech",
  },
  {
    _id: 6,
    name: "知新校园",
    icon: "img:https://cyberdownload.anrunlu.net/FhnDygwJGv0-9_px0T-hjDtTnvZ8",
    themeColor: "indigo",
  },
  {
    _id: 1,
    name: "外语教学平台",
    icon: "img:https://cyberdownload.anrunlu.net/zhixin2.1shot/wypt.png",
    themeColor: "positive",
  },
  {
    _id: 2,
    name: "疫情守护平台",
    icon: "img:https://cyberdownload.anrunlu.net/FmiwZS2QNegxxEK0931eWQqHDOhM",
    themeColor: "positive",
  },
  {
    _id: 3,
    name: "迎新大屏",
    icon: "img:https://cyberdownload.anrunlu.net/FoFhAapoO0ZZLePHEFRZmiYqa0WT",
    themeColor: "accent",
  },
  {
    _id: 5,
    name: "其他项目",
    icon: "img:https://cyberdownload.anrunlu.net/Ftrb_5EkNRmorFu1OCsxUzWu5GEk",
    themeColor: "primary",
  },
];

// 项目详细信息列表
const projectDetailsList = [
  {
    _id: 0,
    name: "知新个性化教学平台",
    icon: "img:https://stu.z-xin.net/favicon.ico",
    description: "",
    link: "https://stu.z-xin.net",
    timeline: [
      {
        title: "知新v2.1开发",
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
            position: "平台架构负责人、全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "田丰",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "运维",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "王寒寒",
            avatar:
              "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
            position: "运维",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
      {
        title: "知新运营一周年&v2.0上线",
        subtitle: "2022年10月10日-至今",
        icon: "cake",
        color: "red",
        content: `<p>🎉10月10日是知新平台运营一周年纪念日🎉，同时也是知新2.0版正式运营的第一天。
          <br>知新2.0用户界面秉持<strong>“化繁为简”</strong>的理念，采用全新的UI，设计和重构了题目作答、作业批改等页面，努力给用户带来简洁易用的体验感；
          <br>知新2.0系统后台坚持<strong>“稳定安全”</strong>的原则，在此基础上全面分析和优化关键业务的处理流程，努力降低系统响应时间，给用户带来顺畅的体验；
          </p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/2.0%E5%AD%A6%E7%94%9F%E7%99%BB%E5%BD%95.png",
          "https://cyberdownload.anrunlu.net/zx2.0-tea-11.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/2.0%E4%BD%9C%E4%B8%9A%E6%89%B9%E6%94%B92.png",
          "https://cyberdownload.anrunlu.net/zx2.0-sj-1.jpeg",
        ],
        members: [
          {
            name: "安润鲁",
            avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
            position: "平台架构负责人、全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "李林",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "开发",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师、平台运营",
            role: "secondary",
            description: "",
          },
        ],
      },
      {
        title: "知新v1.x开发&运维",
        subtitle: "2022年03月10日-至今",
        color: "primary",
        icon: "done_all",
        content: "",
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/zx1.0-4.png",
          "https://cyberdownload.anrunlu.net/zx1.1-1.png",
          "https://cyberdownload.anrunlu.net/zx1.1-2.png",
          "https://cyberdownload.anrunlu.net/zx1.1-3.png",
        ],
        members: [
          {
            name: "李林",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "全栈开发",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "田丰",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "运维",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "王寒寒",
            avatar:
              "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
            position: "运维",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "安润鲁",
            avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
            position: "平台架构负责人、全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师、平台运营",
            role: "secondary",
            description: "",
          },
        ],
      },
      {
        title: "知新v1.0",
        subtitle: "2021年10月10日-2022年3月10日",
        color: "primary",
        icon: "done_all",
        content:
          "在学院领导的大力支持下，知新平台正式上线，平台的宗旨是为广大师生提供良好的教学辅助环境，力争成为具有鲜明特色的优秀教学平台。",
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/zx1.0-1n.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/zx1.0-3.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/zx1.0-5.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/zx1.0-7.png",
          "https://cyberdownload.anrunlu.net/zx1.0-sj-1.jpeg",
        ],
        members: [
          {
            name: "安润鲁",
            avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
            position: "平台架构负责人、全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "张中健",
            avatar: "https://cyberdownload.anrunlu.net/zzj.png",
            position: "前端开发",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "李林",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "全栈开发",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "陈杰",
            avatar:
              "https://cyberdownload.anrunlu.net/%E8%AF%81%E4%BB%B6%E7%85%A7_%E9%99%88%E6%9D%B0.png",
            position: "前端开发",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师、平台运营",
            role: "secondary",
            description: "",
          },
        ],
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
          {
            name: "先溢",
            avatar: "https://cyberdownload.anrunlu.net/%E5%85%88%E6%BA%A26.png",
            position: "平台全栈开发",
            role: "primary",
            description: "",
          },
        ],
      },
    ],
  },
  {
    _id: 1,
    name: "外语教学数据数字化平台",
    icon: "img:img:https://cyberdownload.anrunlu.net/zhixin2.1shot/wypt.png",
    description: "",
    link: "",
    timeline: [
      {
        title: "语料库翻译专业委员会",
        subtitle: "2023年10月-至今",
        content:
          "语料库翻译专业委员会旨在扩大翻译研究的领域，充分发挥数据分析对翻译和翻译研究的强劲支持能力，促进翻译服务国家新时代经济、社会发展和国际治理战略实施的能力，助力一带一路战略实施，并开展语料库制作规范与技术研究，基于语料库的翻译文本研究、翻译过程研究、译者风格研究、机器翻译研究、双语辞典编纂研究，以及基于大数据的翻译文本传播效应研究、语言与文化比较研究和中国政治话语翻译与传播等研究。",
        imgs: [
          "https://cyberdownload.anrunlu.net/FkdTMCMvNNeEwXiU01K-X2djjsX0",
          "https://cyberdownload.anrunlu.net/FoWEuzmZZPCGxKkhVNPQCOtCjU3h",
          "https://cyberdownload.anrunlu.net/Fv7CLueBRAuxvMn-UittmcsdYlMK",
          "https://cyberdownload.anrunlu.net/FlCkrK9VyLrZdvBm4Mdp66X4kXGn",
        ],
        members: [
          {
            name: "田丰",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "王寒寒",
            avatar:
              "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
      {
        title: "外语教学数据数字化平台",
        subtitle: "2021年2月-至今",
        content:
          "为曲阜师范大学、山东农业大学、烟台大学、枣庄学院、菏泽学院、兰州工商学院等院校的外国语学院提供外语教学数字化支持，用户量 6000+。",
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy1.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy2.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy3.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy4.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy5.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/wy6.png",
        ],
        members: [
          {
            name: "安润鲁",
            avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
            position: "平台架构负责人、全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "李林",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "全栈开发",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "张中健",
            avatar: "https://cyberdownload.anrunlu.net/zzj.png",
            position: "前端开发",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "张珠琛",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455184591.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "田丰",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "王寒寒",
            avatar:
              "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师、平台运营",
            role: "secondary",
            description: "",
          },
        ],
      },
    ],
  },
  {
    _id: 2,
    name: "守护曲园",
    icon: "img:https://cyberdownload.anrunlu.net/shqy",
    description: "",
    link: "",
    timeline: [
      {
        title: "核酸检测信息查询平台",
        subtitle: "2022年05月",
        color: "positive",
        content:
          "自2022年05月上线以来，为曲阜师范大学核酸检测学生保障工作提供了极大便利。",
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/hsjc02.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/hsjc03.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/hsjc04.png",
        ],
        members: [
          {
            name: "安润鲁",
            avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
            position: "平台架构负责人、全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师、平台运营、全栈开发",
            role: "secondary",
            description: "",
          },
        ],
      },
      {
        title: "守护曲园",
        subtitle: "2020年01月05日-至今",
        icon: "img:https://cyberdownload.anrunlu.net/shqy",
        color: "brown",
        content: `<p>2020年01月05日至今，为曲园教师提供健康信息填报服务。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy-combined.002.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy2.jpg",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy3.jpg",
        ],
        members: [
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "负责人、全栈开发",
            role: "primary",
            description: "",
          },
        ],
      },
      {
        title: "核酸检测查询",
        subtitle: "February 22, 1986",
        color: "primary",
        icon: "img:https://cyberdownload.anrunlu.net/zhixin2.1shot/yxflogo.png",
        content: "因时因地制宜，积极应对疫情变化，为社会提供服务。",
        imgs: [
          "https://cyberdownload.anrunlu.net/2021412977-1671454846869.png",
          "https://cyberdownload.anrunlu.net/2021412977-1671454520923.png",
          "https://cyberdownload.anrunlu.net/2021412977-1671454388285.png",
          "https://cyberdownload.anrunlu.net/2021412984-1672314103654.png",
          "https://cyberdownload.anrunlu.net/2021412984-1672314097225.png",
        ],
        members: [
          {
            name: "张珠琛",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455184591.jpg",
            position: "全栈开发",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "李林",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "后端开发",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "田丰",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "前端开发",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "王寒寒",
            avatar:
              "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
            position: "前端开发",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
    ],
  },
  {
    _id: 3,
    name: "迎新",
    description: "",
    link: "",
    timeline: [
      {
        title: "迎新大屏",
        subtitle: "2023年9月-至今",
        content:
          "目前为曲阜师范大学网络空间安全学院迎新所用，计划推广到全校使用",
        videos: [
          {
            url: "https://cyberdownload.anrunlu.net/f697001b-1062-4af7-b8e5-db0b4fbb71f6.mp4",
          },
        ],
        imgs: [
          "https://cyberdownload.anrunlu.net/FmrjBDkSsli85U6zDZRlh0ZJhMY3",
          "https://cyberdownload.anrunlu.net/Fn7z_53vhS1MJSkw0dqi7fFr3MeC",
          "https://cyberdownload.anrunlu.net/FtxMHuj7PGCb9rV_B05B-rkFMoeY",
          "https://cyberdownload.anrunlu.net/FvqtLjq6GBBiZkh5G59YL5LjRRCQ",
          "https://cyberdownload.anrunlu.net/FrWL1TifkF6x1dW5n7K0dugD1Y53",
          "https://cyberdownload.anrunlu.net/FpDBz_TO77tWNk9BLCThfTxajAIw",
          "https://cyberdownload.anrunlu.net/FoctYSeY-YTZ0zD6LB5Ps90IiWTE",
          "https://cyberdownload.anrunlu.net/FpGtoMWRuYsVyjZrjt1_CDSqrUw4",
          "https://cyberdownload.anrunlu.net/Fjte4zTc83JLoR6phRvRImRHMnKZ",
          "https://cyberdownload.anrunlu.net/FqbZMAeYn29XwpFml-wH_vVJ5btD",
        ],
        members: [
          {
            name: "安润鲁",
            avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
            position: "平台架构负责人、全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "田丰",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "王寒寒",
            avatar:
              "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师、平台运营",
            role: "secondary",
            description: "",
          },
        ],
      },
    ],
  },
  {
    _id: 5,
    name: "其他项目",
    description: "",
    link: "",
    timeline: [
      {
        title: "易图检索平台",
        subtitle: "2023年06月-至今",
        color: "red",
        content: "",
        imgs: [
          "https://cyberdownload.anrunlu.net/Fn1wlkHiCNhHet07hcc82bPVMQ1V",
          "https://cyberdownload.anrunlu.net/Fo3n_JrmsRC_IBVXUR71gNugg84d",
          "https://cyberdownload.anrunlu.net/Fs_mN1btwh0nNWNXLoS4SG7jLME-",
          "https://cyberdownload.anrunlu.net/Fgj87wntgMIB2xHkj3ePtqoQP53_",
        ],
        members: [
          {
            name: "张吉祥",
            avatar:
              "https://cyberdownload.anrunlu.net/FjJr0hPls5FtQ3gr1RG5ddhvIthd",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "战秀臣",
            avatar:
              "https://cyberdownload.anrunlu.net/Fja71fDDXqdRqSS6w8ew0SqrUfVl",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },

          {
            name: "田丰",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "安润鲁",
            avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
            position: "平台架构负责人、平台全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "王寒寒",
            avatar:
              "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
      {
        title: "曲阜师范大学硕士研究生考试考场查询系统",
        subtitle: "2021年12月-至今",
        color: "pink",
        content: "",
        imgs: ["https://cyberdownload.anrunlu.net/zhixin2.1shot/yjskccx01.png"],
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
        title: "历史文化知识自动答疑平台",
        subtitle: "2021年12月-至今",
        color: "brown",
        content: "",
        imgs: [
          "https://app.yinxiang.com/FileSharing.action?hash=1/647c75072887401a8cc5e4b73cfc9b7b-255677",
          "https://app.yinxiang.com/FileSharing.action?hash=1/4413530452fe3a5f6def21c0b056e387-159582",
          "https://app.yinxiang.com/FileSharing.action?hash=1/0821fd830104014970e99d0d21497e00-111457",
        ],
        members: [
          {
            name: "高士亮",
            avatar:
              "https://app.yinxiang.com/FileSharing.action?hash=1/28db0cff548f9cbf0dfeb0dbda27751e-47197",
            position: "平台架构负责人、平台全栈开发",
            role: "primary",
            description: "",
          },
        ],
      },
      {
        title: "国际媒体话语分析平台",
        subtitle: "2019年12月-至今",
        color: "primary",
        content: "",
        imgs: [
          "https://cyberdownload.anrunlu.net/Fgafb3BrXXTWLs9r7KW1VkI-3P1s",
          "https://cyberdownload.anrunlu.net/FtdTF-aE6QfpTynWMq6fl9CoFwgJ",
        ],
        members: [
          {
            name: "先溢",
            avatar: "https://cyberdownload.anrunlu.net/%E5%85%88%E6%BA%A26.png",
            position: "平台全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "林德雨",
            avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
            position: "平台全栈开发",
            role: "primary",
            description: "",
          },
        ],
      },
      {
        title: "智慧化城市毒品预警系统",
        subtitle: "2018年10月-至今",
        color: "green",
        content: "",
        imgs: [
          "https://cyberdownload.anrunlu.net/FvhCWw1J52c4Uj_f0Y_Bl9Sm_Nto",
          "https://cyberdownload.anrunlu.net/Fv-ZrGA04fiE5_SY4JsLXkQDfDk1",
          "https://cyberdownload.anrunlu.net/Fv_iitP28gCJtbb9AgmuZ6SmZpMN",
          "https://cyberdownload.anrunlu.net/FnUQbHq7il8dIWRRJBw4jRCecY-U",
        ],
        members: [
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "负责人、全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "先溢",
            avatar: "https://cyberdownload.anrunlu.net/%E5%85%88%E6%BA%A26.png",
            position: "平台全栈开发",
            role: "primary",
            description: "",
          },
        ],
      },
      {
        title: "焊接示教系统",
        subtitle: "2017年08月-至今",
        color: "red",
        content: "",
        imgs: [
          "https://cyberdownload.anrunlu.net/FvW-Y883nGAPeEVAge88yerobppX",
        ],
        members: [
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "负责人、全栈开发",
            role: "primary",
            description: "",
          },
        ],
      },
    ],
  },
  {
    _id: 6,
    name: "知新校园",
    icon: "img:https://cyberdownload.anrunlu.net/zhixin2.1shot/wypt.png",
    description: "",
    link: "",
    timeline: [
      {
        title: "知新校园",
        subtitle: "2023年03月05日-至今",
        icon: "group",
        color: "pink-4",
        content: `<p>2023年01月05日至今，为在校大学生提供日常交流、资源分享、课程答疑等服务。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/FinHyHAKZsjQfCXKcoyeKtz4NytA",
          "https://cyberdownload.anrunlu.net/FmIMvjeN9FK-zSVNyFzFf8NKl_6F",
          "https://cyberdownload.anrunlu.net/FmDwr-1uesjVzGHB-63a4UFuu_oe",
          "https://cyberdownload.anrunlu.net/FinHyHAKZsjQfCXKcoyeKtz4NytA",
        ],
        members: [
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "负责人、全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "安润鲁",
            avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
            position: "平台架构负责人、全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "田丰",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
      {
        icon: "group",
        color: "pink-4",
        content: `<p>扫码加入知新校园</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/FpAv0AMtyOGqd03rM2Oi5DOj9qll",
        ],
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
      currSelectedProject: null,
      projectList: projectList,
    };
  },

  methods: {
    handleChangeTabItem(val) {
      // 切换项目
      this.currSelectedProject = projectDetailsList.find(
        (item) => item._id === val
      );
      // 设置路由
      this.$router.push(
        {
          path: "/projects",
          query: {
            id: val,
          },
        },
        () => {}
      );
    },

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

  created() {
    this.currProjectId = Number(this.$route.query.id) || 0;
    this.currSelectedProject = projectDetailsList.find(
      (item) => item._id === this.currProjectId
    );
  },
};
</script>

<style>
.he-img-view {
  max-width: 80% !important;
}
</style>
