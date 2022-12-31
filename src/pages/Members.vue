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
      <q-tab-panel name="currMembers">
        <!-- 现任成员 -->
        <div
          v-for="(group, index) in currMembers"
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
const currMembers = [
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
    groupName: "秘书处",
    groupLevel: 3,
    members: [
      {
        name: "徐沛玉",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
        position: "秘书处负责人",
        description: "",
      },
      {
        name: "王寒寒",
        avatar: "http://cyberdownload.anrunlu.net/2021412977-1671455214709.jpg",
        position: "秘书处成员",
        description: "",
      },
    ],
  },
  {
    groupName: "开发人员",
    groupLevel: 4,
    members: [
      {
        name: "李林",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
        position: "开发负责人",
        description: "",
      },

      {
        name: "张珠琛",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455184591.jpg",
        position: "前端开发",
        description: "",
      },
      {
        name: "田丰",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
        position: "前端开发",
        description: "",
      },
    ],
  },
];

const memberGroups = [
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
  // {
  //   groupName: "系统架构负责人",
  //   groupLevel: 2,
  //   members: [
  //     {
  //       name: "张三",
  //       avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
  //       position: "系统架构负责人",
  //       description: "",
  //     },
  //   ],
  // },
  // {
  //   groupName: "开发人员",
  //   groupLevel: 3,
  //   members: [
  //     {
  //       name: "李四",
  //       avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
  //       position: "全栈开发",
  //       description: "",
  //     },
  //     {
  //       name: "王五",
  //       avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
  //       position: "前端开发",
  //       description: "",
  //     },
  //     {
  //       name: "赵六",
  //       avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
  //       position: "前端开发",
  //       description: "",
  //     },
  //     {
  //       name: "孙七",
  //       avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
  //       position: "前端开发",
  //       description: "",
  //     },
  //     {
  //       name: "周八",
  //       avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
  //       position: "前端开发",
  //       description: "",
  //     },
  //   ],
  // },
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
          "https://cyberdownload.anrunlu.net/2021412977-1671455214709.jpg",
        position: "2021级本科生",
        role: "primary",
        description: "软件工程",
      },
    ],
  },
];

export default {
  name: "Members",
  data() {
    return {
      currMembers: currMembers,
      allMembersJoinTimeline: allMembersJoinTimeline,
      currCategory: "currMembers",
      categorys: [
        {
          name: "currMembers",
          label: "现任成员",
          icon: "person",
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
