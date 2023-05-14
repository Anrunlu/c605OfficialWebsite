<template>
  <q-page class="q-my-lg">
    <div class="row q-my-lg justify-center">
      <div class="col-11 col-md-12">
        <q-tabs
          v-model="currCategory"
          inline-label
          shrink
          outside-arrows
          mobile-arrows
          active-class="text-primary"
        >
          <q-tab
            :name="category.name"
            :icon="category.icon"
            :label="category.label"
            v-for="(category, index) in categorys"
            :key="index"
            :alert="category.alert ? category.alertColor : false"
            :alert-icon="category.alertIcon"
            @click="handleChangeTabItem(category.name)"
          >
          </q-tab>
        </q-tabs>
      </div>
    </div>

    <q-tab-panels v-model="currCategory" animated>
      <q-tab-panel name="softMembers">
        <!-- 软件成员 -->
        <div
          v-for="(group, index) in softMembers"
          :key="index"
          class="row justify-center q-mt-md"
        >
          <div class="col-10 q-gutter-lg text-center">
            <div
              class="person cursor-pointer"
              v-for="(person, index2) in group.members"
              :key="index2"
            >
              <q-avatar class="q-mx-auto shadow-1" size="110px">
                <q-img :src="person.avatar" />
              </q-avatar>
              <div class="name q-mt-sm text-subtitle1 text-weight-medium">
                {{ person.name }}
              </div>
              <div class="position">{{ person.position }}</div>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="hardMembers">
        <!-- 硬件成员 -->
        <div
          v-for="(group, index) in hardMembers"
          :key="index"
          class="row justify-center q-mt-md"
        >
          <div class="col-10 q-gutter-lg text-center">
            <div
              class="person cursor-pointer"
              v-for="(person, index2) in group.members"
              :key="index2"
            >
              <q-avatar class="q-mx-auto shadow-1" size="110px">
                <q-img :src="person.avatar" />
              </q-avatar>
              <div class="name q-mt-sm text-subtitle1 text-weight-medium">
                {{ person.name }}
              </div>
              <div class="position">{{ person.position }}</div>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 全部成员 -->
      <q-tab-panel name="allMembers">
        <div class="row justify-center">
          <div class="col-11 col-md-8">
            <q-timeline color="primary">
              <q-timeline-entry
                :subtitle="event.subtitle"
                :icon="event.icon"
                :color="event.color"
                v-for="(event, index) in allMembersJoinTimeline"
                :key="index"
              >
                <div class="row">
                  <div class="q-gutter-lg text-center">
                    <div
                      class="person cursor-pointer"
                      v-for="(person, index2) in event.members"
                      :key="index2"
                    >
                      <q-avatar class="q-mx-auto shadow-1" size="110px">
                        <q-img :src="person.avatar" />
                      </q-avatar>
                      <div
                        class="name q-mt-sm text-subtitle1 text-weight-medium"
                      >
                        {{ person.name }}
                      </div>
                      <div class="position">{{ person.position }}</div>
                    </div>
                  </div>
                </div>
              </q-timeline-entry>
            </q-timeline>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
const softMembers = [
  {
    groupName: "负责人",
    groupLevel: 1,
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
  {
    groupName: "系统架构负责人",
    groupLevel: 2,
    members: [
      {
        name: "安润鲁",
        avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
        position: "系统架构负责人",
        description: "",
      },
    ],
  },
  {
    groupName: "开发人员",
    groupLevel: 3,
    members: [
      {
        name: "田丰",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
        position: "开发负责人",
        description: "",
      },
      {
        name: "王寒寒",
        avatar:
          "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
        position: "全栈开发",
        description: "",
      },
    ],
  },
  {
    groupName: "开发人员",
    groupLevel: 4,
    members: [
      {
        name: "战秀臣",
        avatar:
          "https://cyberdownload.anrunlu.net/Fja71fDDXqdRqSS6w8ew0SqrUfVl",
        position: "前端开发",
        description: "",
      },
      {
        name: "张吉祥",
        avatar:
          "https://cyberdownload.anrunlu.net/FjJr0hPls5FtQ3gr1RG5ddhvIthd",
        position: "前端开发",
        description: "",
      },
    ],
  },
];
const hardMembers = [
  {
    groupName: "负责人",
    groupLevel: 1,
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
  {
    groupName: "硬件开发总负责人",
    groupLevel: 2,
    members: [
      {
        name: "刘昶江",
        avatar: "https://cyberdownload.anrunlu.net/Fsp0T1ZNTiO0PiGxb6wtEm_2zHfw",
        position: "硬件开发总负责人",
        description: "",
      },
    ],
  },
  {
    groupName: "硬件调试",
    groupLevel: 3,
    members: [
      {
        name: "李伯瀚",
        avatar:
          "https://cyberdownload.anrunlu.net/Fk_NQwbkQqNBjyjWLkrvr6dXPX0n",
        position: "硬件调试",
        description: "",
      },
      {
        name: "武铸华",
        avatar:
          "https://cyberdownload.anrunlu.net/FtVB8naPZXQCf8CMWX2HS_aDXKeu",
        position: "硬件调试",
        description: "",
      },
       {
        name: "刘梦杰",
        avatar:
          "https://cyberdownload.anrunlu.net/FjFUwj_5PhzcIXu6Dbz2A6uLobAy",
        position: "硬件调试",
        description: "",
      },
       {
        name: "臧雨濛",
        avatar:
          "https://cyberdownload.anrunlu.net/FqkO3oMSOsMo6Bz8IZ0XBetW0Pcj",
        position: "硬件调试",
        description: "",
      },
    ],
  },
  {
    groupName: "软件算法",
    groupLevel: 4,
    members: [
      {
        name: "王竞祺",
        avatar:
          "https://cyberdownload.anrunlu.net/Fgk-xgWhKZ7WbNr2a28CfYZp-Cgp",
        position: "软件算法",
        description: "",
      },
      // {
      //   name: "范越",
      //   avatar:
      //     "https://cdn.quasar.dev/img/boy-avatar.png",
      //   position: "软件算法",
      //   description: "",
      // },
       {
        name: "张建邦",
        avatar:
          "https://cyberdownload.anrunlu.net/FlKBwkRDl5ytQmv3GqquHGpoFpf5",
        position: "软件算法",
        description: "",
      },
       {
        name: "林媛媛",
        avatar:
          "https://cyberdownload.anrunlu.net/FpBkAHiWzakQ2m7zWO9BKX70UtiL",
        position: "软件算法",
        description: "",
      },
    ],
  },
    {
    groupName: "文档图注",
    groupLevel: 5,
    members: [
      {
        name: "何璇",
        avatar:
          "https://cyberdownload.anrunlu.net/FgUACPfmwQUAcnxdWamrkybMML5W",
        position: "文档图注",
        description: "",
      },
      // {
      //   name: "宫雨凡",
      //   avatar:
      //     "https://cdn.quasar.dev/img/boy-avatar.png",
      //   position: "文档图注",
      //   description: "",
      // },
      {
        name: "万新康",
        avatar:
          "https://cyberdownload.anrunlu.net/Foe-_5c5yWizuZwDnX9irXv6UOel",
        position: "文档图注",
        description: "",
      },
      {
        name: "张蕴之",
        avatar:
          "https://cyberdownload.anrunlu.net/Fvy6JoJgZA7KBQO-JOvQbxgdzFLx",
        position: "文档图注",
        description: "",
      },
      {
        name: "牛健",
        avatar:
          "https://cyberdownload.anrunlu.net/FpA4doJDyDHSikTrG1eyUzZFTEnO",
        position: "文档图注",
        description: "",
      },
    ],
  },
];

const allMembersJoinTimeline = [
  {
    title: "",
    subtitle: "",
    icon: "military_tech",
    color: "accent",
    content: ``,
    members: [
      {
        name: "周子力",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
        position: "负责人、指导老师",
        role: "primary",
        description: "",
      },
    ],
  },
  {
    title: "",
    subtitle: "2019年09月加入",
    content: ``,
    members: [
      {
        name: "先溢",
        avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/xianyi02.png",
        position: "2018级本科生",
        role: "primary",
        grade: "2018级",
        description: "",
      },
    ],
  },
  {
    title: "",
    subtitle: "2020年07月加入",
    color: "primary",
    content: "",
    members: [
      {
        name: "安润鲁",
        avatar:
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/%E8%AF%81%E4%BB%B6%E7%85%A7_%E5%AE%891.png",
        position: "2019级本科生",
        role: "primary",
        description: "软件工程",
      },
      {
        name: "张中健",
        avatar:
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/zhangzhongjian.png",
        position: "2019级本科生",
        role: "primary",
        description: "软件工程",
      },
    ],
  },
  {
    title: "",
    subtitle: "2021年03月加入",
    color: "primary",
    content: "",
    members: [
      {
        name: "李林",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
        position: "2020级本科生",
        role: "primary",
        description: "软件工程",
      },
    ],
  },
  {
    title: "",
    subtitle: "2021年04月加入",
    color: "primary",
    content: "",
    members: [
      {
        name: "李佳欣",
        avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/lijiaxin.png",
        position: "2018级本科生",
        role: "primary",
        description: "软件工程",
      },
      {
        name: "张毓莹",
        avatar:
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/zhangyuying2.png",
        position: "2018级本科生",
        role: "primary",
        description: "软件工程",
      },
    ],
  },
  {
    title: "",
    subtitle: "2021年05月加入",
    color: "primary",
    content: "",
    members: [
      {
        name: "武小雨",
        avatar:
          "https://cyberdownload.anrunlu.net/zhixin2.1shot/mmexport1666348227758.jpg",
        position: "2019级本科生",
        role: "primary",
        description: "软件工程",
      },
    ],
  },
  {
    title: "",
    subtitle: "2021年06月加入",
    color: "primary",
    content: "",
    members: [
      {
        name: "陈杰",
        avatar:
          "https://cyberdownload.anrunlu.net/%E8%AF%81%E4%BB%B6%E7%85%A7_%E9%99%88%E6%9D%B0.png",
        position: "2020级本科生",
        role: "primary",
        description: "软件工程",
      },
    ],
  },
  {
    title: "",
    subtitle: "2021年09月加入",
    color: "primary",
    content: "",
    members: [
      {
        name: "徐沛玉",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
        position: "2020级本科生",
        role: "primary",
        description: "物联网工程",
      },
    ],
  },
  {
    title: "",
    subtitle: "2022年09月加入",
    content: ``,
    members: [
      {
        name: "刘昶江",
        avatar:
          "https://cyberdownload.anrunlu.net/Fsp0T1ZNTiO0PiGxb6wtEm_2zHfw",
        position: "2020级本科生",
        role: "primary",
        description: "通信工程",
      },
      {
        name: "张珠琛",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455184591.jpg",
        position: "2020级本科生",
        role: "primary",
        description: "软件工程",
      },
      {
        name: "田丰",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
        position: "2021级本科生",
        role: "primary",
        description: "软件工程",
      },
      {
        name: "王寒寒",
        avatar:
          "https://cyberdownload.anrunlu.net/FmUE6tFhp8G1BpGOL-Gsb4cGL1Gu",
        position: "2021级本科生",
        role: "primary",
        description: "软件工程",
      },
    ],
  },
  {
    title: "",
    subtitle: "2023年03月加入",
    content: ``,
    members: [
      {
        name: "战秀臣",
        avatar:
          "https://cyberdownload.anrunlu.net/Fja71fDDXqdRqSS6w8ew0SqrUfVl",
        position: "2022级本科生",
        role: "primary",
        description: "网络空间安全",
      },
      {
        name: "张吉祥",
        avatar:
          "https://cyberdownload.anrunlu.net/FjJr0hPls5FtQ3gr1RG5ddhvIthd",
        position: "2022级本科生",
        role: "primary",
        description: "物联网工程",
      },
    ],
  },
];

export default {
  name: "SoftMembers",
  data() {
    return {
      softMembers: softMembers,
      hardMembers: hardMembers,
      allMembersJoinTimeline: allMembersJoinTimeline,
      currCategory: "hardMembers",
      categorys: [
        {
          name: "softMembers",
          label: "软件现任成员",
          icon: "code",
        },
        {
          name: "hardMembers",
          label: "硬件现任成员",
          icon: "memory",
        },
        {
          name: "allMembers",
          label: "全部成员(以加入时间为序)",
          icon: "people",
        },
      ],
    };
  },
};
</script>
<style>
.person {
  display: inline-block;
}
</style>
