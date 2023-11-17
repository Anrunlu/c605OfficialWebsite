<template>
  <q-page class="q-my-lg">
    <div class="row q-my-lg justify-center">
      <div class="col-11 col-md-12">
        <q-tabs
          v-model="currMatchId"
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
            v-for="(project, index) in matchList"
            :key="index"
            :alert="project.alert ? project.alertColor : false"
            :alert-icon="project.alertIcon"
            @click="handleChangeTabItem(project._id)"
          >
          </q-tab>
        </q-tabs>
      </div>
    </div>

    <div class="row justify-center">
      <div class="col-9">
        <div>
          <div class="text-h5">
            <!-- 项目名称 -->
            {{ currSelectedMatch.name }}
            <!-- 项目链接 -->
            <a
              v-if="currSelectedMatch.link"
              :href="currSelectedMatch.link"
              target="_blank"
              rel="noopener noreferrer"
              style="text-decoration: none"
              ><q-icon size="xs" name="open_in_new"
            /></a>
          </div>
          <!-- 项目描述 -->
          <div class="text-body2">{{ currSelectedMatch.description }}</div>
        </div>

        <!-- 时间线 -->
        <q-timeline color="primary">
          <!-- 事件 -->
          <q-timeline-entry
            :title="event.title"
            :subtitle="event.subtitle"
            :icon="event.icon"
            :color="event.color"
            v-for="(event, index) in currSelectedMatch.timeline"
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
const matchList = [
  {
    _id: 0,
    name: "软件风采",
    icon: "img:https://cyberdownload.anrunlu.net/FivS1FSe0QHCB8G6QU_d5hre9ZDn",
    themeColor: "indigo",
  },
  {
    _id: 1,
    name: "硬件风采",
    icon: "img:https://cyberdownload.anrunlu.net/FivS1FSe0QHCB8G6QU_d5hre9ZDn",
    themeColor: "indigo",
  },
];
const matchDetailsList = [
  {
    _id: 0,
    name: "软件竞赛",
    icon: "img:http://www.52jingsai.com/favicon.ico",
    description: "",
    link: "",
    timeline: [
      {
        title: "大学生创新训练项目计划",
        subtitle: "2023年9月01日-2023年9月30日",
        color: "",
        content: `<p>为了积极响应国家对传染病预防的有力举措，降低传染病的危害，拟基于传染病知识图谱，建立传染疾病防控规则，结合时空演化模型预测数据，借助前期研究的图谱推理机制，切实提高数据预测和预案生成的准确性。本项目拟研发知识驱动的传染病时空演化与预案生成一体化平台，用于辅助中国疾病预防控制中心(CDC)对37种法定传染性疾病的实时网络监测系统，以个人、医院、政府为主要导向生成“三位一体”的防控预案，为降低传染病危害做出一定贡献。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/Fuw9sSkjkfN4xQJZ7jMwxJftU6lD",
        ],
        members: [
          {
            name: "王艳娜",
            avatar:
              "https://cyberdownload.anrunlu.net/Fk_1SDcWMlkXFZfdmiCi8Pv49pcs",
            position: "指导老师",
            role: "secondary",
            description: "讲师",
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
            name: "田丰",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
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
        ],
      },
      {
        title: "山东省软件设计大赛",
        subtitle: "2023年9月01日-2023年9月30日",
        color: "",
        content: `<p>这是一个基于知识图谱的文件存储系统，提供了一种创新的方式来管理和可视化用户的文件。与传统的文件存储系统相比，该系统通过利用知识图谱技术，将文件之间的关联关系以直观的图形方式展示给用户。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/Fs3Z9NKBGQnNu6kc1DWVeMe_MRQN",
          "https://cyberdownload.anrunlu.net/Fi7KJiJq9al-wWYEBS0PhfGJwQdF",
          "https://cyberdownload.anrunlu.net/Fgv0TD2lA4ZKGGxKD2EkwgqwjC5C",
          "https://cyberdownload.anrunlu.net/FuBuJ3E_3iNpf5dx7kVE5_IEuQra",
        ],
        members: [
          {
            name: "周子力",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
            position: "指导老师",
            role: "secondary",
            description: "副教授",
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
            name: "田丰",
            avatar:
              "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
            position: "团队成员",
            role: "primary",
            description: "软件工程",
          },
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
        ],
      },
      {
        title: "第十八届“挑战杯”曲阜师范大学大学生课外学术科技作品竞赛",
        subtitle: "2022年10月07日-2023年06月30日",
        color: "",
        content: `<p>以“疫先锋——知识与数据双驱动的疫情防控与决策平台”作为此次的参赛项目。该平台实现了从疫情预警、流调分析到预案生成全过程数智化、自动化的疫情防控与决策功能。在项目提交之前，团队成员做了明确的分工，以保证高效率、高质量的完成比赛所需的提交材料。由于疫情政策的改变，团队后期对该平台做了一定的升级，以此来更好的适应当下的政策，同时更好的满足用户需求。</p>`,
        imgs: [
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
              "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
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
              "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
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
    _id: 1,
    name: "硬件竞赛",
    icon: "",
    description: "",
    link: "",
    timeline: [
      {
        title: "闪电宝——PD 诱骗式 DC-DC 智能物联电源",
        subtitle: "2022年10月07日-2023年06月30日",
        color: "",
        content: `<p>为解决特殊工况下的电源适配化问题、输出接口兼容性问题以及电源物联赋能需要，拟采取模块化设计思路设计了由PD/AFC/QC诱骗子模块，Buck型DC-DC同步整流子模块，ESP-WROOM-32物联子模块构成的智能物联电源，具备多路独立输出、电源输出控制等功能，为传统电源实用性升级、物联电源的未来设计、与特殊场景的电源适配问题提供解决思路。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/FnXd3qiy7YEcWmia9noLlTC5Qvfl",
          "https://cyberdownload.anrunlu.net/FiayfS5rmI_dRzO3IEp3hHzoU-kK",
          "https://cyberdownload.anrunlu.net/FiAsCca9Hekds9e1TfSVtvCVM6zJ",
          "https://cyberdownload.anrunlu.net/FkQjPUQmVCQIrmZIKrFqNSG4gOLn",
        ],
        members: [
          {
            name: "刘昶江",
            avatar:
              "https://cyberdownload.anrunlu.net/Fsp0T1ZNTiO0PiGxb6wtEm_2zHfw",
            position: "硬件开发总负责人",
            role: "primary",
            description: "",
          },
          {
            name: "刘梦杰",
            avatar:
              "https://cyberdownload.anrunlu.net/FjFUwj_5PhzcIXu6Dbz2A6uLobAy",
            position: "硬件调试",
            role: "primary",
            description: "",
          },
          {
            name: "李伯瀚",
            avatar:
              "https://cyberdownload.anrunlu.net/Fk_NQwbkQqNBjyjWLkrvr6dXPX0n",
            position: "硬件调试",
            role: "primary",
            description: "",
          },
          {
            name: "林媛媛",
            avatar:
              "https://cyberdownload.anrunlu.net/FpBkAHiWzakQ2m7zWO9BKX70UtiL",
            position: "软件算法",
            role: "primary",
            description: "",
          },
        ],
      },
      {
        title: "运动目标控制与自动追踪系统（E题）",
        subtitle: "2023年8月02日-2023年08月10日",
        color: "",
        content: `<p>系统采用ESP32-S3作为主控，OPENMV4作为图像识别模块进行色块追踪、中心点坐标参数获取，实现视觉坐标系下的参数采集，在人机交互上，使用串口屏模拟按键，在系统控制上通过插值处理降低运动惯性造成的机械角度偏差，通过PID算法实现运动逻辑闭环控制。在基础功能上，系统能够在短时间内完成复位、15-20s时限内完成边缘线循迹、黑色胶带边线循迹等功能。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/FpSbYvHEK_kNCFXwlT2RaLCldtca",
          "https://cyberdownload.anrunlu.net/Fr1EvNwpLIRjh80UfAKL-8VgKLdL",
          "https://cyberdownload.anrunlu.net/FlvduFQyu5PfQoDhr_urwZALmywI",
        ],
        members: [
          {
            name: "刘梦杰",
            avatar:
              "https://cyberdownload.anrunlu.net/FjFUwj_5PhzcIXu6Dbz2A6uLobAy",
            position: "硬件调试",
            role: "primary",
            description: "",
          },
          {
            name: "万新康",
            avatar:
              "https://cyberdownload.anrunlu.net/Foe-_5c5yWizuZwDnX9irXv6UOel",
            position: "文档图注",
            role: "primary",
            description: "",
          },
          {
            name: "张建邦",
            avatar:
              "https://cyberdownload.anrunlu.net/FlKBwkRDl5ytQmv3GqquHGpoFpf5",
            position: "软件算法",
            role: "primary",
            description: "",
          },
          {
            name: "臧雨濛",
            avatar:
              "https://cyberdownload.anrunlu.net/FqkO3oMSOsMo6Bz8IZ0XBetW0Pcj",
            position: "硬件调试",
            role: "primary",
            description: "",
          },
          {
            name: "王寒寒",
            avatar:
              "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
            position: "全栈开发",
            role: "primary",
            description: "",
          },
          {
            name: "张蕴之",
            avatar:
              "https://cyberdownload.anrunlu.net/Fvy6JoJgZA7KBQO-JOvQbxgdzFLx",
            position: "文档图注",
            role: "primary",
            description: "",
          },
        ],
      },
      {
        title: "声源定位跟踪系统（E题）",
        subtitle: "2022年8月02日-2022年08月10日",
        color: "",
        content: `<p>本系统采用 ESP32-S3 为主控芯片，由自制 5W 可调音量音箱作为声源，使用MEMS 阵列麦克风采集声音信息，经由 TDOA 算法解析定位声源距离和角度等位置信息，串口屏实时输出声源位置信息、PID 算法优化 MG996R 舵机二维云台实现声源定位动态追踪。在声源定位检测测试中，装置在平均 2.01%的角度测量误差、平均 2 秒时间内测得距离和角度。在声源指示控制测试中，装置在 2.32%的角度测量误差内和平均 1.68 秒时间内定位计算完成舵机运动和声源激光标识。在声源动态追踪测试中，使用 PID 算法下，激光笔光点能够持续跟随运动声源，跟踪反应时间在 1 秒内。</p>`,
        imgs: [
          "https://cyberdownload.anrunlu.net/FnmX11fp00T2peM4H_0BQDEqL_XX",
          "https://cyberdownload.anrunlu.net/FswtL6A3IdGNKK-3eJJvJxqqAm8l",
        ],
        members: [
          {
            name: "刘昶江",
            avatar:
              "https://cyberdownload.anrunlu.net/Fsp0T1ZNTiO0PiGxb6wtEm_2zHfw",
            position: "硬件开发总负责人",
            role: "primary",
            description: "",
          },
          {
            name: "刘梦杰",
            avatar:
              "https://cyberdownload.anrunlu.net/FjFUwj_5PhzcIXu6Dbz2A6uLobAy",
            position: "硬件调试",
            role: "primary",
            description: "",
          },
        ],
      },
    ],
  },
];

export default {
  name: "Match",
  data() {
    return {
      currMatchId: 0,
      currSelectedMatch: null,
      matchList: matchList,
    };
  },
  methods: {
    handleChangeTabItem(val) {
      this.currSelectedMatch = matchDetailsList.find(
        (item) => item._id === val
      );
      // 设置路由
      this.$router.push(
        {
          path: "/match",
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
    this.currMatchId = Number(this.$route.query.id) || 0;
    this.currSelectedMatch = matchDetailsList.find(
      (item) => item._id === this.currMatchId
    );
  },
};
</script>

<style></style>
