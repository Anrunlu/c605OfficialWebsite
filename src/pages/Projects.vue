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
    _id: 1,
    name: "外语教学平台",
    icon: "img:https://cyberdownload.anrunlu.net/zhixin2.1shot/wypt.png",
    themeColor: "positive",
  },
  {
    _id: 2,
    name: "守护曲园",
    icon: "img:https://cyberdownload.anrunlu.net/shqy",
    themeColor: "positive",
  },
  {
    _id: 3,
    name: "核酸检测查询",
    icon: "img:https://cyberdownload.anrunlu.net/zhixin2.1shot/yxflogo.png",
    themeColor: "accent",
  },
  {
    _id: 4,
    name: "学科竞赛",
    icon: "img:https://cyberdownload.anrunlu.net/zhixin2.1shot/jingsailogo.png",
    themeColor: "orange",
  },
  {
    _id: 5,
    name: "其他项目",
    icon: "img:https://cyberdownload.anrunlu.net/FrqCZCofCO99p1xU-Rc-VHXzA3uL",
    themeColor: "primary",
  },
  {
    _id: 6,
    name: "知新社区",
    icon: "img:https://cyberdownload.anrunlu.net/Ftrb_5EkNRmorFu1OCsxUzWu5GEk",
    themeColor: "indigo",
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
            name: "徐沛玉",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
            position: "运维",
            role: "primary",
            description: "物联网工程",
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
              "https://cyberdownload.anrunlu.net/2021412977-1671455214709.jpg",
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
          // "https://cyberdownload.anrunlu.net/zhixin2.1shot/zx1.0-2.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/zx1.0-3.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/zx1.0-5.png",
          // "https://cyberdownload.anrunlu.net/zhixin2.1shot/zx1.0-6.png",
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
            name: "徐沛玉",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
            position: "前端开发",
            role: "primary",
            description: "物联网工程",
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
            name: "徐沛玉",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
            position: "团队成员",
            role: "primary",
            description: "物联网工程",
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
              "https://cyberdownload.anrunlu.net/2021412977-1671455214709.jpg",
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
        title: "守护曲园",
        subtitle: "2020年01月05日-至今",
        icon: "home",
        color: "brown",
        content: `<p>2020年01月05日至今，为曲园教师提供健康信息填报服务。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy-combined.002.png",
          // "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy-combined.001.jpeg",
          // "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy1.jpg",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy2.jpg",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy3.jpg",
          // "https://cyberdownload.anrunlu.net/zhixin2.1shot/shqy4.jpg",
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
    _id: 3,
    name: "核酸检测查询",
    description: "",
    link: "",
    timeline: [
      // {
      //   title: "核酸检测查询",
      //   subtitle: "February 22, 1986",
      //   color: "primary",
      //   icon: "done_all",
      //   content: "因时因地制宜，积极应对疫情变化，为社会提供服务。",
      //   imgs: [
      //     "https://cyberdownload.anrunlu.net/2021412977-1671454863369.png",
      //     "https://cyberdownload.anrunlu.net/2021412977-1671454846869.png",
      //     "https://cyberdownload.anrunlu.net/2021412977-1671454520923.png",
      //     "https://cyberdownload.anrunlu.net/2021412977-1671454388285.png",
      //     "https://cyberdownload.anrunlu.net/2021412984-1672314103654.png",
      //     "https://cyberdownload.anrunlu.net/2021412984-1672314097225.png",
      //   ],
      //   members: [
      //     {
      //       name: "徐沛玉",
      //       avatar:
      //         "https://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
      //       position: "项目负责人",
      //       role: "primary",
      //       description: "物联网工程",
      //     },
      //     {
      //       name: "张珠琛",
      //       avatar:
      //         "https://cyberdownload.anrunlu.net/2021412977-1671455184591.jpg",
      //       position: "全栈开发",
      //       role: "primary",
      //       description: "软件工程",
      //     },
      //     {
      //       name: "李林",
      //       avatar:
      //         "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
      //       position: "后端开发",
      //       role: "primary",
      //       description: "软件工程",
      //     },
      //     {
      //       name: "田丰",
      //       avatar:
      //         "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
      //       position: "前端开发",
      //       role: "primary",
      //       description: "软件工程",
      //     },
      //     {
      //       name: "王寒寒",
      //       avatar:
      //         "https://cyberdownload.anrunlu.net/2021412977-1671455214709.jpg",
      //       position: "前端开发",
      //       role: "primary",
      //       description: "软件工程",
      //     },
      //   ],
      // },
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
    ],
  },
  {
    _id: 4,
    name: "学科竞赛",
    icon: "img:http://www.52jingsai.com/favicon.ico",
    description: "",
    link: "",
    timeline: [
      {
        title: "第十八届“挑战杯”曲阜师范大学大学生课外学术科技作品竞赛",
        subtitle: "2022年10月07日-2023年06月30日",
        color: "",
        content: `<p>以“疫先锋——知识与数据双驱动的疫情防控与决策平台”作为此次的参赛项目。该平台实现了从疫情预警、流调分析到预案生成全过程数智化、自动化的疫情防控与决策功能。在项目提交之前，团队成员做了明确的分工，以保证高效率、高质量的完成比赛所需的提交材料。由于疫情政策的改变，团队后期对该平台做了一定的升级，以此来更好的适应当下的政策，同时更好的满足用户需求。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/2021412977-1671454863369.png",
          "https://cyberdownload.anrunlu.net/2021412977-1671454846869.png",
          "https://cyberdownload.anrunlu.net/2021412977-1671454520923.png",
          "https://cyberdownload.anrunlu.net/2021412977-1671454388285.png",
          "https://cyberdownload.anrunlu.net/2021412984-1672314103654.png",
          "https://cyberdownload.anrunlu.net/2021412984-1672314097225.png",
        ],
        members: [
          {
            name: "王茂励",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455043230.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院院长",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师",
            role: "secondary",
            description: "副教授",
          },
          {
            name: "范瑞红",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455081085.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院书记",
          },
          {
            name: "徐沛玉",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
            position: "项目负责人",
            role: "primary",
            description: "物联网工程",
          },
          {
            name: "李林",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "安润鲁",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455099712.jpg",
            position: "团队成员",
            role: "primary",
            description: "智能数据",
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
              "https://cyberdownload.anrunlu.net/2021412977-1671455214709.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
      {
        title: "第九届山东省大学生科技创新大赛",
        subtitle: "2022年10月28日-2022年12月15日",
        color: "",
        content: `<p>曲际岛——基于认知智能与智慧网络的大学社交元宇宙、疫先锋——知识与数据双驱动的疫情防控与决策平台、知新——个性化教学过程管理平台，三个参赛作品分别由三位负责人带队伍。时间紧任务重，团队成员争分夺秒积极备赛，最终顺利完成了比赛准备工作。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/2021412984-1672315089842.png",
          "https://cyberdownload.anrunlu.net/2021412984-1672315070704.png",
          "https://cyberdownload.anrunlu.net/2021412977-1671454933467.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/qjd-combined-0.png",
        ],
        members: [
          {
            name: "王茂励",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455043230.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院院长",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师",
            role: "secondary",
            description: "副教授",
          },
          {
            name: "范瑞红",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455081085.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院书记",
          },
          {
            name: "徐沛玉",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
            position: "项目负责人",
            role: "primary",
            description: "物联网工程",
          },
          {
            name: "李林",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "安润鲁",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455099712.jpg",
            position: "团队成员",
            role: "primary",
            description: "智能数据",
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
              "https://cyberdownload.anrunlu.net/2021412977-1671455214709.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
      {
        title: "中国互联网“+”大学生创新创业大赛",
        subtitle: "2022年3月28日-2022年11月15日",
        color: "",
        content:
          "此次比赛以“明冠沁心”——数字大脑平台作为比赛的参赛项目，该平台的设计意在体现当下个性化教学、因材施教的教学理念；在报名提交材料之前，团队成员做了具体的分工，工作主要分为两大部分——平台完善、参赛材料的编写。由于团队成员合理的合作，保证了参赛作品的高质量的完成。",
        imgs: [
          "https://cyberdownload.anrunlu.net/2021412984-1672315807110.png",
          // "https://cyberdownload.anrunlu.net/2021412984-1672315803097.png",
          // "https://cyberdownload.anrunlu.net/2021412984-1672315798433.png",
          // "https://cyberdownload.anrunlu.net/2021412984-1672315794696.png",
          "https://cyberdownload.anrunlu.net/2021412984-1672315791235.png",
          "https://cyberdownload.anrunlu.net/2021412984-1672315786176.png",
        ],
        members: [
          {
            name: "王茂励",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455043230.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院院长",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师",
            role: "secondary",
            description: "副教授",
          },
          {
            name: "范瑞红",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455081085.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院书记",
          },
          {
            name: "徐沛玉",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
            position: "项目负责人",
            role: "primary",
            description: "物联网工程",
          },
          {
            name: "李林",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "张中健",
            avatar:
              "https://cyberdownload.anrunlu.net/zhixin2.1shot/zhangzhongjian.png",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "安润鲁",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455099712.jpg",
            position: "团队成员",
            role: "primary",
            description: "智能数据",
          },
          {
            name: "张珠琛",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455184591.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
      {
        title: "第八届山东省大学生科技创新大赛",
        subtitle: "2021年11月-2022年01月",
        color: "orange",
        content: `<p>参赛作品名“知新——个性化教学过程管理平台”，经过指导老师和团队成员的共同努力，最终获得三等奖的成绩。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/1672550174651.jpg",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E5%B1%B1%E4%B8%9C%E7%9C%81%E5%A4%A7%E5%AD%A6%E7%94%9F%E7%A7%91%E6%8A%80%E5%88%9B%E6%96%B0%E5%A4%A7%E8%B5%9B%E5%86%B3%E8%B5%9B%E4%B8%89%E7%AD%89%E5%A5%96%EF%BC%88%E5%8F%82%E4%B8%8E%EF%BC%8C2-5%EF%BC%89.jpg",
        ],
        members: [
          {
            name: "王茂励",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455043230.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院院长",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师",
            role: "secondary",
            description: "副教授",
          },
          {
            name: "张中健",
            avatar:
              "https://cyberdownload.anrunlu.net/zhixin2.1shot/zhangzhongjian.png",
            position: "团队负责人",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "安润鲁",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455099712.jpg",
            position: "团队成员",
            role: "primary",
            description: "智能数据",
          },
          {
            name: "武小雨",
            avatar:
              "https://cyberdownload.anrunlu.net/zhixin2.1shot/mmexport1666348227758.jpg",
            position: "团队成员",
            role: "primary",
            description: "智能数据",
          },
          {
            name: "徐沛玉",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
            position: "项目负责人",
            role: "primary",
            description: "物联网工程",
          },
          {
            name: "李林",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
      {
        title: "第十七届“挑战杯”山东省大学生课外学术科技作品竞赛",
        subtitle: "2020年11月-2021年06月",
        color: "",
        content: `<p>参赛作品名“助力莘莘学子腾飞平台”，经过指导老师和团队成员的共同努力，最终获得山东省一等奖的成绩，填补了学院此项赛事奖项的空白。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/17thtiaozhanbei.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E6%8C%91%E6%88%98%E6%9D%AF.png",
        ],
        members: [
          {
            name: "王茂励",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455043230.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院院长",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师",
            role: "secondary",
            description: "副教授",
          },
          {
            name: "范瑞红",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455081085.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院书记",
          },
          {
            name: "张中健",
            avatar:
              "https://cyberdownload.anrunlu.net/zhixin2.1shot/zhangzhongjian.png",
            position: "团队负责人",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "安润鲁",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455099712.jpg",
            position: "团队成员",
            role: "primary",
            description: "智能数据",
          },
          {
            name: "先溢",
            avatar: "https://cyberdownload.anrunlu.net/%E5%85%88%E6%BA%A26.png",
            position: "团队成员",
            role: "primary",
            description: "",
          },
          {
            name: "李佳欣",
            avatar:
              "https://cyberdownload.anrunlu.net/zhixin2.1shot/lijiaxin1.png",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "张毓莹",
            avatar:
              "https://cyberdownload.anrunlu.net/zhixin2.1shot/zhangyuying1.png",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
        ],
      },
      {
        title: "山东省第二届数据应用创新创业大赛",
        subtitle: "2020年11月-2021年06月",
        color: "",
        content: `<p>经过指导老师和团队成员的共同努力，在最终的决赛答辩中团队成员沉着冷静，不输强大的竞争对手，最终获得决赛第二名的成绩，为学院争得了荣誉。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/20210516%E5%B1%B1%E4%B8%9C%E7%9C%81%E7%AC%AC%E4%BA%8C%E5%B1%8A%E6%95%B0%E6%8D%AE%E5%88%9B%E6%96%B0%E5%BA%94%E7%94%A8%E5%A4%A7%E8%B5%9B%E4%BA%8C%E7%AD%89%E5%A5%96.png",
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/sjcxzhengshu.png",
        ],
        members: [
          {
            name: "王茂励",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455043230.png",
            position: "指导老师",
            role: "secondary",
            description: "网络空间安全学院院长",
          },
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师",
            role: "secondary",
            description: "副教授",
          },
          {
            name: "张中健",
            avatar:
              "https://cyberdownload.anrunlu.net/zhixin2.1shot/zhangzhongjian.png",
            position: "团队负责人",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "安润鲁",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455099712.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "先溢",
            avatar: "https://cyberdownload.anrunlu.net/%E5%85%88%E6%BA%A26.png",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "张毓莹",
            avatar:
              "https://cyberdownload.anrunlu.net/zhixin2.1shot/zhangyuying1.png",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
          {
            name: "李佳欣",
            avatar:
              "https://cyberdownload.anrunlu.net/zhixin2.1shot/lijiaxin1.png",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
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
        title: "曲阜师范大学硕士研究生考试考场查询系统",
        subtitle: "2021年12月-至今",
        color: "brown",
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
    name: "知新社区",
    icon: "img:https://cyberdownload.anrunlu.net/zhixin2.1shot/wypt.png",
    description: "",
    link: "",
    timeline: [
      {
        title: "知新社区",
        subtitle: "2023年03月05日-至今",
        icon: "group",
        color: "pink-4",
        content: `<p>2023年01月05日至今，为在校大学生提供日常交流、资源分享、课程答疑等服务。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/FuEErnrBhDppLxePpPk69TQ8W2Ud",
          "https://cyberdownload.anrunlu.net/FmIMvjeN9FK-zSVNyFzFf8NKl_6F",
          "https://cyberdownload.anrunlu.net/FsXHaIe6UlP36cIULYNbpcRPRChb",
          "https://cyberdownload.anrunlu.net/FvbRx2KxVE4O526m_7f0zEPtXIof",
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
        content: `<p>扫码加入知新社区</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/FnTWekVKK0wuRnj-nX5Jd-oYnVHP",
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
